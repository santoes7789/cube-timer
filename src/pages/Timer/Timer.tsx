import { useCallback, useEffect, useRef, useState } from "react";
import { formatMilliseconds } from "@/utils/time";
import { useTimes } from "@/contexts/TimesContext";
import "./Timer.css";
import TimesList from "./TimesList";
import SessionDisplay from "./SessionDisplay";
import Scramble, { generateNewScramble } from "./Scramble";
import RubiksCubeDisplay from "./RubiksCubeDisplay";

type TimerState = "idle" | "waiting" | "ready" | "running" | "stopped";

function Timer() {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("idle");

  const timeoutRef = useRef(0);
  const updateTimerRef = useRef(0);

  const startTime = useRef(0);

  const times = useTimes();

  const [scramble, setScramble] = useState(() => generateNewScramble());

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
      setState("stopped");
      clearInterval(updateTimerRef.current);
      setTime(endTime - startTime.current);
      times?.timesDispatch({
        type: "add",
        time: {
          timestamp_start: startTime.current,
          timestamp_end: endTime,
          time: endTime - startTime.current,
          modifier: "",
          comment: "",
        }
      })

      setScramble(generateNewScramble());
    }
  }, [state]);

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
      <TimesList times={times?.times}/>
      <SessionDisplay />
      <Scramble scramble={scramble}/>
      <RubiksCubeDisplay scramble={scramble} />
    </div>
  );
}

export default Timer;
