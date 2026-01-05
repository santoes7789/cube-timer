import { useCallback, useEffect, useRef, useState } from "react";
import { formatMilliseconds } from "@/utils/time";
import "./Timer.css";
import TimesList from "./TimesList";
import SessionDisplay from "./SessionDisplay";
import Scramble, { generateNewScramble } from "./Scramble";
import RubiksCubeDisplay from "./RubiksCubeDisplay";
import { addTime } from "@/db/times";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/db/db";

type TimerState = "idle" | "waiting" | "ready" | "running" | "stopped";

function Timer() {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("idle");

  const timeoutRef = useRef(0);
  const updateTimerRef = useRef(0);

  const startTime = useRef(0);

  const [scramble, setScramble] = useState(() => generateNewScramble());

  const sessions = useLiveQuery(() => db.session.toArray()); 

  const [currentSession, setCurrentSession] = useState(sessions?.at(0)?.id ?? 1);

  const times = useLiveQuery(() => db.times.where("session").equals(currentSession).toArray(), [currentSession]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (state === "idle" && event.code === "Space") {
      //READY TIMER
      setState("waiting");
      timeoutRef.current = setTimeout(() => {
        setState("ready");
        setTime(0);
      }, 400);

    } else if (state === "running") {
      //STOP TIMER
      const endTime = Date.now();
      const time = endTime - startTime.current;
      setState("stopped");
      clearInterval(updateTimerRef.current);
      setTime(time);

      addTime({
        timestamp: startTime.current,
        time: time,
        modifier: "",
        comment: "",
        session: currentSession,
      })

      setScramble(generateNewScramble());
    }
  }, [state, currentSession]);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (state === "ready" && event.code === "Space") {
      //START TIMER
      setState("running");
      startTime.current = Date.now();
      updateTimerRef.current = setInterval(() => { 
        setTime(Date.now() - startTime.current); 
      }, 1)

    } else if (state === "waiting") {
      //RESET TIMER
      setState("idle");
      clearTimeout(timeoutRef.current);
    }
  }, [state]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const onFinish = useCallback(() => {
    if (state === "stopped") {
      setState("idle");
    }
  },[state])

  return (
    <div>
      <h1 className={`timer-text timer-text--${state}`} onTransitionEnd={onFinish}>
        {formatMilliseconds(time)}
      </h1>
      <TimesList times={times}/>
      <SessionDisplay sessions={sessions} currentSession={currentSession} setSession={setCurrentSession}/>
      <Scramble scramble={scramble}/>
      <RubiksCubeDisplay scramble={scramble} />
    </div>
  );
}

export default Timer;
