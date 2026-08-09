import db from "@/db/db";
import type { Session } from "@/db/session";
import type { Time } from "@/db/times";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { sendChangesToSupabase } from "@/utils/supabase";

type DBContextType = {
  sessions: Session[];
  times: Time[];
  currentSession: string | null;
  currentSessionName: string;

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

  const auth = useAuth();

  useEffect(() => {
    if (!auth?.session) {
      setCurrentUser("default");
    } else if (auth.session.user.id !== currentUser) {
      setCurrentUser(auth.session.user.id);
    }
  }, [auth, currentUser])

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


  const currentSessionName = sessions.find((s) => s.uuid === currentSession)?.name ?? "";

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
      synced: 0,
      uuid: crypto.randomUUID()
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

    if (auth) {
      sendChangesToSupabase(currentUser);
    }
  }

  function updateSession(id: number, updates: Partial<Session>) {
    db.sessions.update(id, { ...updates, synced: 0, updated_at: new Date().toISOString() });
  }

  function deleteSession(uuid: string) {
    db.times.where("[user_id+session_uuid]").equals([currentUser, uuid]).delete();
    db.sessions.where("uuid").equals(uuid).delete();
  }

  async function setCurrentUser(user_id: string) {
    currentUserSetter(user_id);
    const userSessions = await db.sessions.where("user_id").equals(user_id).toArray();
    if (userSessions.length === 0) {
      addSession("3x3", user_id);
      // const sessionId = await db.addDefaultSession(user_id);
      // setCurrentSession(sessionId);
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
        currentSessionName,
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
