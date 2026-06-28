import db from "@/db/db";
import type { Session } from "@/db/session";
import type { Time } from "@/db/times";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { dbWorker } from "@/App";

type DBContextType = {
  sessions: Session[];
  times: Time[];
  currentSession: string | null;

  setCurrentSession: (session: string) => void;
  setCurrentUser: (user: string) => void;

  addTime: (startTime: string, time: number, scramble: string) => void;
  updateTime: (id: number, updates: Partial<Time>) => void;
  deleteTime: (id: number) => void;

  addSession: (name: string) => void;
  updateSession: (id: number, updates: Partial<Session>) => void;
  deleteSession: (uuid: string) => void;
};

const DBContext = createContext<DBContextType | null>(null);

export const useDB = () => {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error("DBProvider missing");
  return ctx;
};

export default function DBProvider({ children }: { children: ReactNode }) {
  const [currentUser, currentUserSetter] = useState("default");
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const authSession = useAuth();


  useEffect(() => {
    if (!authSession) {
      setCurrentUser("default");
    } else if (authSession.user.id !== currentUser) {
      setCurrentUser(authSession.user.id);
    }
  }, [authSession])

  // Start up code
  useEffect(() => {
    // set initial session to be first on in db
    async function loadId() {
      const session = await db.sessions.where("user_id").equals("default").first();
      if (session) {
        setCurrentSession(session.uuid);
      }
    }
    loadId();

    // add event listener to db worker
    dbWorker.addEventListener("message", (event) => {
      const { type, success, message, data } = event.data;
      console.log("Received from db-worker:", message );

      if(type === "ADD_SESSION") {
        setCurrentSession(data);
      }

    });
  }, []);

  const sessions = useLiveQuery(
    () => db.sessions.where("user_id").equals(currentUser).toArray(),
    [currentUser],
    [],
  );

  const times = useLiveQuery(
    () =>
      db.times
        .where("[user_id+session_uuid]")
        .equals([currentUser, currentSession ?? ""])
        .toArray(),
    [currentSession, currentUser],
    [],
  );


  // functions to edit times table //
  function addTime(startTime: string, time: number, scramble: string) {
    if (currentSession === null) return null;
    const timeObj = {
      timestamp: startTime,
      time: time,
      scramble: scramble,
      updated_at: new Date().toISOString(),
      user_id: currentUser,
      session_uuid: currentSession,
    }
    dbWorker.postMessage({ type: "ADD_TIME", data: timeObj, auth: currentUser })
  }


  function updateTime(id: number, updates: Partial<Time>) {
    dbWorker.postMessage({ type: "UPDATE_TIME", data: { id, updates }, auth: currentUser })
  }

  function deleteTime(id: number) {
    dbWorker.postMessage({ type: "DELETE_TIME", data: id, auth: currentUser});
  }


  // functions to edit sessions table //
  function addSession(name: string) {
    const sessionObj = {
      name: name,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      user_id: currentUser,
    }

    dbWorker.postMessage({ type: "ADD_SESSION", data: sessionObj, auth: currentUser })
  }

  function updateSession(id: number, updates: Partial<Session>) {
    dbWorker.postMessage({ type: "UPDATE_SESSION", data: { id, updates }, auth: currentUser })
  }

  function deleteSession(uuid: string) {
    dbWorker.postMessage({ type: "DELETE_SESSION", data: { uuid: uuid }, auth: currentUser})
  }

  async function setCurrentUser(user_id: string) {
    currentUserSetter(user_id);
    const userSessions = await db.sessions.where("user_id").equals(user_id).toArray();
    if (userSessions.length === 0) {
      const sessionId = await db.addDefaultSession(user_id);
      setCurrentSession(sessionId);
    } else {
      setCurrentSession(userSessions[0].uuid);
    }
  }
  return (
    <DBContext
      value={{
        sessions,
        times,
        currentSession,
        setCurrentSession: (session: string) => setCurrentSession(session),

        addTime,
        updateTime,
        deleteTime,

        addSession,
        updateSession,
        deleteSession,

        setCurrentUser,
      }}>
      {children}
    </DBContext>
  );
}
