import { type SessionType, type TimeType } from "@/types";
import { createContext, useContext, useReducer, useState, type ActionDispatch, type Dispatch, type ReactNode, type SetStateAction } from "react";

type TimesActions = { type: "add" | "edit" | "delete"; time: TimeType; };
type SessionActions = { type: "add",  name: string; } | { type: "edit" | "delete", session: SessionType };

interface TimesContextType {
  times: TimeType[];
  timesDispatch: ActionDispatch<[action: TimesActions]>;

  activeSession: string;
  setActiveSession: Dispatch<SetStateAction<string>>;
  
  sessionData: SessionType[];
  sessionDispatch: ActionDispatch<[action: SessionActions]>;
  activeSessionName: string;
}

const TimesContext = createContext<TimesContextType | null>(null);
export const useTimes = () => useContext(TimesContext);

function timesReducer(state: TimeType[], action: TimesActions) {
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

function sessionReducer(state: SessionType[], action: SessionActions) {
  switch (action.type) {
    case "add":
      const newSession: SessionType = {
        id: crypto.randomUUID(),
        name: action.name,
        timestamp: Date.now()
      }
      return [...state, newSession];
    case "edit":
      console.log("Editing time");
      break;
    case "delete":
      console.log("Deleting time");
      return state;
    default:
      console.log("Action type unknown")
      return state
  }
  return state;
}

export default function TimesProvider({ children }: { children: ReactNode }) {
  const [times, timesDispatch] = useReducer(timesReducer, []);
  const [activeSession, setActiveSession] = useState("0");
  const [sessionData, sessionDispatch] = useReducer(sessionReducer, [{ id: "0", name: "3x3", timestamp: 0}]);
  const activeSessionName = sessionData.find(s => s.id === activeSession)?.name ?? "3x3";

  return (
    <TimesContext value={{
      times,
      timesDispatch,
      activeSession,
      setActiveSession,
      sessionData,
      sessionDispatch,
      activeSessionName
    }}>
      {children}
    </TimesContext>
  )
}
