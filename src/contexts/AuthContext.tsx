import supabase, { getUser } from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";

type AuthContextType = {
  session: Session | null,
  user: User | null,
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session) {
      getUser(session.user.id).then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, [session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Retrieving session");
      setSession(session);
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth change detected: ", event);
      setSession(session)
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={{
      session,
      user
    }}>{children}</AuthContext>;
}
