import supabase from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dbLastSynced } from "@/db/db";

const AuthContext = createContext<Session | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);


  useEffect(() => {
    // subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH CHANGE: ", event);
      setSession(session);
      if (session) {
        if (event === "SIGNED_IN") {
          // updateDatabase(session.user.id);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={session}>{children}</AuthContext>;
}
