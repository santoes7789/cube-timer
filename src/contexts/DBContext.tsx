import db from "@/db/db";
import type { Session } from "@/db/session";
import type { Time } from "@/db/times";
import { updateSupabase } from "@/utils/supabase";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type DBContextType = {
  sessions: Session[];
  times: Time[];
  currentSession: number;

  setCurrentSession: (session: number) => void;
  setCurrentUser: (user: string) => void;

  addTime: (startTime: string, time: number, scramble: string) => Promise<number>;
  updateTime: (id: number, updates: Partial<Time>) => Promise<number>;
  deleteTime: (id: number) => Promise<void>;

  addSession: (
    session: Omit<Session, "id" | "table" | "updated_at" | "user_id">,
  ) => Promise<number>;
  updateSession: (id: number, updates: Partial<Session>) => Promise<number>;
  deleteSession: (id: number) => Promise<void>;
};

const DBContext = createContext<DBContextType | null>(null);

export const useDB = () => {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error("DBProvider missing");
  return ctx;
};

export default function DBProvider({ children }: { children: ReactNode }) {
  const [currentUser, currentUserSetter] = useState("default");
  const [currentSession, setCurrentSession] = useState(1); // need to fix so inital session is one from the db

  const sessions = useLiveQuery(
    () => db.sessions.where("user_id").equals(currentUser).toArray(),
    [currentUser],
    [],
  );
  const times = useLiveQuery(
    () => db.times.where("[user_id+session_id]").equals([currentUser, currentSession]).toArray(),
    [currentSession, currentUser],
    [],
  );

  async function addTime(startTime: string, time: number, scramble: string) {
    return await db.times.add({
      timestamp: startTime,
      time: time,
      scramble: scramble,
      updated_at: new Date().toISOString(),
      user_id: currentUser,
      session_id: currentSession,
    });
  }
  async function updateTime(id: number, updates: Partial<Time>) {
    return await db.times.update(id, { ...updates, updated_at: new Date().toISOString() });
  }

  async function deleteTime(id: number) {
    return await db.times.delete(id);
  }

  async function addSession(session: Omit<Session, "id" | "table" | "updated_at" | "user_id">) {
    return await db.sessions.add({
      ...session,
      updated_at: new Date().toISOString(),
      user_id: currentUser,
    });
  }

  async function updateSession(id: number, updates: Partial<Session>) {
    return await db.sessions.update(id, { ...updates, updated_at: new Date().toISOString() });
  }

  async function deleteSession(id: number) {
    console.log("Deleting session: ", id);
    await db.times.where("[user_id+session_id]").equals([currentSession, id]).delete();
    return await db.sessions.delete(id);
  }

  async function setCurrentUser(user_id: string) {
    currentUserSetter(user_id);
    const userSessions = await db.sessions.where("user_id").equals(user_id).toArray();
    if (userSessions.length === 0) {
      const sessionId = await db.addDefaultSession(user_id);
      setCurrentSession(sessionId);
    } else {
      setCurrentSession(userSessions[0].id);
    }
  }
  return (
    <DBContext
      value={{
        sessions,
        times,
        currentSession,
        setCurrentSession: (session: number) => setCurrentSession(session),

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
