import supabase from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import type { Session as SessionType } from "@/db/session";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useDB } from "./DBContext";

const AuthContext = createContext<Session | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const { createNewDB } = useDB();

  async function getFromSupabase() {
    const sessionData = await supabase.from("sessions").select();
    const timesData = await supabase.from("times").select();
    if (sessionData.error || timesData.error) {
      throw Error();
    }

    const sess = sessionData.data.map((row) => ({
      "id" : row["id"],
      "name" : row["name"],
      "created_at" : new Date(row["created_at"]).getTime(),
      "updated_at": new Date(row["timestamp"]).getTime(),
     }))

     const times = timesData.data.map((row) => ({
      "id" : row["id"],
      "time" : row["time"],
      "timestamp": new Date(row["timestamp"]).getTime(),
      "updated_at": new Date(row["timestamp"]).getTime(),
      "session_id" : row["session_id"],
      "modifier" : row["modifier"],
      "comment" : row["commment"],
      "scramble" : row["scramble"],
     }))
    return { "sessionData" : sess, "timesData" : times};
  }

  useEffect(() => {

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH CHANGE: ", event);
      setSession(session);
      if(event == "SIGNED_IN" && session) {
        // Check for updates
        // getFromSupabase()
        //   .then(({sessionData, timesData}) => createNewDB(session.user.id, sessionData, timesData));
      }

    })
    return () => subscription.unsubscribe();
  }, [])





  return (
    <AuthContext value={session}>
      {children}
    </AuthContext>
  )
}
