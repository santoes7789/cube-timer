import { useCallback, useEffect, useRef, useState } from "react";
import { formatMilliseconds } from "@/utils/time";

import "./Timer.css";

import TimesList from "./TimesList";
import SessionDisplay from "./SessionDisplay";
import Scramble, { generateNewScramble } from "./Scramble";
import RubiksCubeDisplay from "./RubiksCubeDisplay";
import TimesStats from "./TimesStats";

import { useDB } from "@/contexts/DBContext";
import { Outlet } from "react-router-dom";
import { useSettings } from "@/contexts/SettingsContext";
import NavButtons from "./NavButtons";

type TimerState = "idle" | "waiting" | "ready" | "running" | "stopped";

function Timer() {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("idle");

  const timeoutRef = useRef(0);
  const updateTimerRef = useRef(0);
  const startTime = useRef(0);

  const [scramble, setScramble] = useState(() => generateNewScramble());

  const db = useDB();

  const settings = useSettings();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state === "idle" && event.code === "Space") {
        //READY TIMER
        setState("waiting");
        timeoutRef.current = setTimeout(() => {
          setState("ready");
          setTime(0);
        }, settings.timerWaitTime);
      } else if (state === "running") {
        //STOP TIMER
        const endTime = Date.now();
        const time = endTime - startTime.current;
        setState("stopped");
        clearInterval(updateTimerRef.current);
        setTime(time);

        db.addTime(new Date(startTime.current).toISOString(), time, scramble);
        setScramble(generateNewScramble());
      }
    },
    [state, db, scramble, settings],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (state === "ready" && event.code === "Space") {
        //START TIMER
        setState("running");
        startTime.current = Date.now();
        updateTimerRef.current = setInterval(() => {
          setTime(Date.now() - startTime.current);
        }, settings.timerUpdateInterval);
      } else if (state === "waiting") {
        //RESET TIMER
        setState("idle");
        clearTimeout(timeoutRef.current);
      }
    },
    [state, settings],
  );

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
  }, [state]);

  return (
    <div className="timer-page-container">
      <h1 className={`timer-text timer-text--${state}`} onTransitionEnd={onFinish}>
        {formatMilliseconds(time)}
      </h1>
      <TimesList />
      <NavButtons />
      <TimesStats times={db.times} />
      <SessionDisplay />
      <Scramble scramble={scramble} />
      <RubiksCubeDisplay scramble={scramble} />

      {/* Where the settings drawer goes when url is timer/settings */}
      <Outlet />
    </div>
  );
}

export default Timer;
