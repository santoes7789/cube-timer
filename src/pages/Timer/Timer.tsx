import { useCallback, useEffect, useRef, useState } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useDB } from "@/contexts/DBContext";
import styles from "./Timer.module.css";
import TimeList from "./TimeList";
import Divider from "@/components/Divider";
import TimeStats from "./TimeStats";
import Sessions from "./Sessions";
import { formatMilliseconds } from "@/utils/time";

type TimerState = "idle" | "waiting" | "ready" | "running" | "stopped";

function Timer() {
  const [time, setTime] = useState(0);
  const [state, setState] = useState<TimerState>("idle");

  const timeoutRef = useRef(0);
  const updateTimerRef = useRef(0);
  const startTime = useRef(0);

  const settings = useSettings();
  const db = useDB();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (state === "idle" && event.code === "Space") {
        setState("waiting");
        timeoutRef.current = setTimeout(() => {
          setState("ready"); setTime(0);
        }, settings.timerWaitTime);

      } else if (state === "running") {
        //STOP TIMER
        const time = Date.now() - startTime.current;
        setState("idle");
        clearInterval(updateTimerRef.current);
        setTime(time);

        // If user is in zenmode, don't add time to db
        if (!settings.zenMode) {
          db.addTime(new Date(startTime.current).toISOString(), time, "");
        }
      } else if (event.code === "Escape") {
        settings.setZenMode(false);
      }
    },
    [state, settings],
  );

  // When user lets go of a buton
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

  return (
    <>
      <Divider />
      <h1 className={styles.timer} data-status={state}>{formatMilliseconds(time)}</h1>
      <Divider />
      <div className={styles.bottomContainer}>
        <div className="row-container">
          <Sessions />
          <Divider orientation="vertical" />
          <TimeStats />
        </div>
        <div className="row-container">
          <Divider orientation="vertical" />
          <TimeList />
        </div>
      </div>
    </>
  )
}

export default Timer;
