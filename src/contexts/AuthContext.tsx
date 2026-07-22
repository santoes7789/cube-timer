import supabase, { getUser } from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dbLastSynced } from "@/db/db";
import type { User } from "@/types";
import { useToast } from "./ToastContext";

type AuthContextType = {
  session: Session | null,
  user: User | null,
  reloadUser: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const toast = useToast();

  function reloadUser() {
    if (session) {
      getUser(session.user.id).then((user) => setUser(user));
    } else {
      setUser(null);
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
          getUser(session.user.id).then((user) => {
            if (user) {
              setUser(user)
            }
          });

        }
      } else {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);


  return <AuthContext value={session ? { session, user, reloadUser } : null}>{children}</AuthContext>;
}
