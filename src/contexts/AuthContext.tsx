import supabase from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dbLastSynced } from "@/db/db";

const AuthContext = createContext<Session | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  async function getFromSupabase() {
    const sessionData = await supabase.from("sessions").select();
    const timesData = await supabase.from("times").select();
    if (sessionData.error || timesData.error) {
      throw Error();
    }

    const sess = sessionData.data.map((row) => ({
      uuid: row["uuid"],
      name: row["name"],
      created_at: row["created_at"],
      updated_at: row["timestamp"],
      user_id: row["user_id"],
    }));

    const times = timesData.data.map((row) => ({
      time: row["time"],
      timestamp: row["timestamp"],
      updated_at: row["updated_at"],
      session_uuid: row["session_uuid"],
      user_id: row["user_id"],
      modifier: row["modifier"],
      comment: row["commment"],
      scramble: row["scramble"],
      
    }));
    return { sessionData: sess, timesData: times };
  }

  async function updateDatabase(id: string) {
    // Check supabase lastest update
    const { data, error } = await supabase.functions.invoke("last-updated");

    if (error || data === null) {
      console.error(error);
      return;
    }

    const supabaseLastUpdated = data.updated_at;
    // Check local database latest update
    const localLastUpdated = dbLastSynced(id);

    // convert to js date object for comparison
    const supabaseTime = new Date(supabaseLastUpdated ?? 0);
    const localTime = new Date(localLastUpdated ?? 0);

    if (supabaseTime > localTime) {
      console.log("Server has updates");

      // pull changes
      const { data: timeData, error: timeError } = await supabase
        .from("times")
        .select()
        .gt("updated_at ", localTime.toISOString());

      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select()
        .gt("updated_at ", localTime.toISOString());

      if (timeError || sessionError) return;

      //apply changes
      const sess = sessionData.map((row) => ({
        uuid: row["uuid"],
        name: row["name"],
        created_at: row["created_at"],
        updated_at: row["updated_at"],
        user_id: row["user_id"],
        synced: 1,
      }));

      const times = timeData.map((row) => ({
        time: row["time"],
        timestamp: row["timestamp"],
        updated_at: row["updated_at"],
        session_uuid: row["session_uuid"],
        user_id: row["user_id"],
        modifier: row["modifier"],
        comment: row["commment"],
        scramble: row["scramble"],
      }));

      // db.times.bulkAdd(data);
      // setDbLastSynced(id, supabaseLastUpdated);
    } else {
      console.log("local db is up to date");
    }
  }

  useEffect(() => {
    // subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH CHANGE: ", event);
      setSession(session);
      if (session) {
        if (event === "SIGNED_IN") {
          updateDatabase(session.user.id);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={session}>{children}</AuthContext>;
}
