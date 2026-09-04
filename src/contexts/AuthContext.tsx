import supabase, { getUser } from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types";
import { useToast } from "./ToastContext";

type AuthContextType = {
  session: Session | null,
  user: User | null,
  reloadUser: () => void,
}

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext);

// Auth provider so the rest of the application has access to current auth state
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const toast = useToast();

  // Get the user details again from supabase
  function reloadUser() {
    if (session) {
      getUser(session.user.id).then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    // subscribe to auth changes
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH CHANGE: ", event);
      setSession(session);

      // If user is signed in previously, sign in as that user
      if (session) {
        if (event === "SIGNED_IN") {
          getUser(session.user.id).then((user) => {
            if (user) {
              setUser(user)
            }
          });
        } else if (event === "INITIAL_SESSION") {
          toast.success(`Signed in!`)
        }
      } else {
        setUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext value={session ? { session, user, reloadUser } : null}>{children}</AuthContext>;
}
