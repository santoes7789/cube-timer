import { type TimeType } from "@/types";
import { createContext, useContext, useEffect, useReducer, useState, type ActionDispatch, type Dispatch, type ReactNode, type SetStateAction } from "react";

type timesActions = { type: "add" | "edit" | "delete"; time: TimeType; };

interface TimesContextType {
  times: TimeType[];
  timesDispatch: ActionDispatch<[action: timesActions]>;
  activeSession: number;
  setActiveSession: Dispatch<SetStateAction<number>>;
}

const TimesContext = createContext<TimesContextType | null>(null);
export const useTimes = () => useContext(TimesContext);

function timesReducer(state: TimeType[], action: timesActions) {
  switch (action.type) {
    case "add":
      console.log("Adding time");
      return [...state, action.time];
    case "edit":
      console.log("Editing time");
      break;
    case "delete":
      console.log("Deleting time");
      return state.filter(t => t.timestamp_start === action.time.timestamp_start);
    default:
      console.log("Action type unknown")
      return state
  }
  return state;
}

export default function TimesProvider({ children }: { children: ReactNode }) {
  const [times, timesDispatch] = useReducer(timesReducer, []);
  const [activeSession, setActiveSession] = useState(0);

  return (
    <TimesContext value={{
      times,
      timesDispatch,
      activeSession,
      setActiveSession,
    }}>
      {children}
    </TimesContext>
  )
}
