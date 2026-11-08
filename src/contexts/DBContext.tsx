import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@/db/session";
import type { Time } from "@/db/times";
import db from "@/db/db";

type DBContextType = {
  sessions: Session[];
  times: Time[];
  currentSession: string | null;
  currentSessionName: string;

  setCurrentSession: (session: string) => void;

  addTime: (startTime: string, time: number, scramble: string) => void;
  updateTime: (id: number, updates: Partial<Time>) => void;
  deleteTime: (id: number) => void;

  addSession: (name: string) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  deleteSession: (uuid: string) => void;
};

const DBContext = createContext<DBContextType | null>(null);

export const useDB = () => {
  const ctx = useContext(DBContext);
  if (!ctx) throw new Error("DBProvider missing");
  return ctx;
};

// DB provider so rest of app has access to the db.
export default function DBProvider({ children }: { children: ReactNode }) {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const currentUser = "local";

  // Sessions and times as live query
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


  const currentSessionName = sessions.find((s) => s.uuid === currentSession)?.name ?? "";

  // functions to edit times table //
  function addTime(startTime: string, time: number, scramble: string) {
    if (currentSession === null) return null;
    const timeObj = {
      time: time,
      timestamp: startTime,
      session_uuid: currentSession,
      scramble: scramble,

      uuid: crypto.randomUUID(),
      updated_at: new Date().toISOString(),
      user_id: currentUser,
      synced: 0,
    }

    db.times.add(timeObj);
  }


  function updateTime(id: number, updates: Partial<Time>) {
    db.times.update(id, { ...updates, synced: 0, updated_at: new Date().toISOString() });
  }

  function deleteTime(id: number) {
    db.times.delete(id);
  }


  // functions to edit sessions table //
   function addSession(name: string, user_id=currentUser) {
    const randUUID = crypto.randomUUID();
    const sessionObj = {
      name: name,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      user_id: user_id,
      uuid: randUUID,
      synced: 0,
    }
    db.sessions.add(sessionObj).then(() => {
      setCurrentSession(randUUID);
    });
  }

  function updateSession(uuid: string, updates: Partial<Session>) {
    db.sessions.update(uuid, { ...updates, synced: 0, updated_at: new Date().toISOString() });
  }

  async function deleteSession(uuid: string) {
    db.times.where("[user_id+session_uuid]").equals([currentUser, uuid]).delete();
    await db.sessions.where("uuid").equals(uuid).delete();
    if (uuid === currentSession) {
      const newSession = await db.sessions.toCollection().first();
      if (newSession) {
        setCurrentSession(newSession.uuid);
      } else {
        setCurrentSession(null);
      }
    }
  }

  // Start up code
  useEffect(() => {
    async function setInitialSession() {
      // TODO: initial session to be last used session, not the first record
      const session = await db.sessions.toCollection().first();
      if (session) {
        setCurrentSession(session.uuid);
      }     }
    setInitialSession();
  }, []);



  return (
    <DBContext
      value={{
        sessions,
        times,
        currentSession,
        currentSessionName,
        setCurrentSession: (session: string) => setCurrentSession(session),

        addTime,
        updateTime,
        deleteTime,

        addSession,
        updateSession,
        deleteSession,
      }}>
      {children}
    </DBContext>
  );
}
