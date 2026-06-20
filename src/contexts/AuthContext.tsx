import supabase from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Session as SessionType } from "@/db/session";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useDB } from "./DBContext";
import db from "@/db/db";

const AuthContext = createContext<Session | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const { setCurrentUser } = useDB();

  async function getFromSupabase() {
    const sessionData = await supabase.from("sessions").select();
    const timesData = await supabase.from("times").select();
    if (sessionData.error || timesData.error) {
      throw Error();
    }

    const sess = sessionData.data.map((row) => ({
      id: row["id"],
      name: row["name"],
      created_at: row["created_at"],
      updated_at: row["timestamp"],
      user_id: row["user_id"],
    }));

    const times = timesData.data.map((row) => ({
      id: row["id"],
      time: row["time"],
      timestamp: row["timestamp"],
      updated_at: row["updated_at"],
      session_id: row["session_id"],
      user_id: row["user_id"],
      modifier: row["modifier"],
      comment: row["commment"],
      scramble: row["scramble"],
    }));
    return { sessionData: sess, timesData: times };
  }

  async function updateDatabase(id: string) {
    // Check supabase lastest update
    supabase.functions.invoke("last-updated").then((res) => console.log(res.data.updated_at));

    // Check local database latest update
    console.log(await db.lastUpdated(id));
  }

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH CHANGE: ", event);
      setSession(session);
      if (session) {
        setCurrentUser(session.user.id);
        updateDatabase(session.user.id);
      } else {
        setCurrentUser("default");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={session}>{children}</AuthContext>;
}
