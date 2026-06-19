import Database from "@/db/db";
import type { Session } from "@/db/session";
import type { Time } from "@/db/times";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useState, type ReactNode } from "react";


type DBContextType = {
  sessions: Session[];
  times: Time[];
  currentSession: number;
  setCurrentSession: (session: number) => void;

  addTime: (time: Omit<Time, "id" | "table" | "updated_at">) => Promise<number>;
  updateTime: (id: number, updates: Partial<Time>) => Promise<number>;
  deleteTime: (id: number) => Promise<void>;

  addSession: (session: Omit<Session, "id" | "table" | "updated_at">) => Promise<number>;
  updateSession: (id: number, updates: Partial<Session>) => Promise<number>;
  deleteSession: (id: number) => Promise<void>;

  createNewDB: (name: string, sessionData: Omit<Session, "table">[], timesData: Omit<Time, "table">[]) => void;
}

const DBContext = createContext<DBContextType | null>(null);

export const useDB = () => {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error("DBProvider missing");
  return ctx;
}

export default function DBProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState(() => new Database("default"));

  const [currentSession, setCurrentSession] = useState(1); // need to fix so inital session is one from the db
  const sessions = useLiveQuery(() => db.sessions.toArray(), [db], []);
  const times = useLiveQuery(() => db.times.where("session_id").equals(currentSession).toArray(), [db, currentSession], []);

  async function addTime(time: Omit<Time, "id" | "table" | "updated_at">) {
    return await db.times.add({...time, updated_at: Date.now()})
  }

  async function updateTime(id: number, updates: Partial<Time>) {
    return await db.times.update(id, { ...updates, updated_at: Date.now() })
  }

  async function deleteTime(id: number) {
    return await db.times.delete(id);
  }

  async function addSession(session: Omit<Session, "id" | "table" | "updated_at">) {
    return await db.sessions.add({...session, updated_at: Date.now()})
  }

  async function updateSession(id: number, updates: Partial<Session>) {
    return await db.sessions.update(id, { ...updates, updated_at: Date.now() })
  }

  async function deleteSession(id: number) {
    console.log("Deleting session: ", id);
    await db.times
      .where("session")
      .equals(id)
      .delete();
    return await db.sessions.delete(id);
  }

  function createNewDB(name: string, sessionData: Omit<Session, "table">[], timesData: Omit<Time, "table">[]) {
    console.log("Creating new DB: ", name);
    const newDB = new Database(name);
    newDB.sessions.clear();
    newDB.times.clear();

    newDB.sessions.bulkPut(sessionData);
    newDB.times.bulkPut(timesData);
    setDb(newDB);
  }

  function openDB(name: string) {
    setDb(new Database(name));
  }

  return (
    <DBContext value={{
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

      createNewDB
    }}>
      {children}
    </DBContext>
  )
}
