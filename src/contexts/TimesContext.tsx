import { type SessionType, type TimeType } from "@/types";
import { createContext, useContext, useReducer, type ActionDispatch, type ReactNode } from "react";

type TimesActions = { type: "add" | "edit" | "delete", time: TimeType };
type SessionActions = { type: "add", name: string, id: string, setSession: boolean } |
{ type: "edit" | "delete", session: SessionType } |
{ type: "set", id: string };

type SessionDataType = {
  sessions: SessionType[];
  activeSession: string;
}

interface TimesContextType {
  times: TimeType[];
  timesDispatch: ActionDispatch<[action: TimesActions]>;

  sessionData: SessionDataType;
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
      return state;
    case "delete":
      console.log("Deleting time");
      return state.filter(t => t.timestamp_start === action.time.timestamp_start);
    default:
      console.log("Action type unknown")
      return state;
  }
}

function sessionReducer(state: SessionDataType, action: SessionActions) {
  switch (action.type) {
    case "add":
      const newSession: SessionType = {
        id: action.id,
        name: action.name,
        timestamp: Date.now()
      }

      if (action.setSession) {
        return {
          sessions: [...state.sessions, newSession],
          activeSession: action.id,
        };
      }

      return {
        ...state,
        sessions: [...state.sessions, newSession],
      };

    case "set":
      return {
        ...state,
        activeSession: action.id
      };
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
  const [sessionData, sessionDispatch] = useReducer(sessionReducer,
    {
      sessions: [{ id: "0", name: "3x3", timestamp: 0 }],
      activeSession: "0"
    });
  const activeSessionName = sessionData.sessions.find(s => s.id === sessionData.activeSession)?.name ?? "3x3";

  return (
    <TimesContext value={{
      times,
      timesDispatch,
      sessionData,
      sessionDispatch,
      activeSessionName
    }}>
      {children}
    </TimesContext>
  )
}
