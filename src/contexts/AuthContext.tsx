import supabase from "@/utils/supabase";
import type { JwtPayload } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const AuthContext = createContext<JwtPayload | null>(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [claims, setClaims] = useState<JwtPayload | null>(null)


  useEffect(() => {
    // Check for existing session using getClaims
    supabase.auth.getClaims().then(({ data }) => {
      console.log(data);
      if (!data?.claims) return;
      setClaims(data.claims);
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      supabase.auth.getClaims().then(({ data }) => {
        if (data?.claims) {
          setClaims(data.claims);
        }
        console.log(data);
      })
    })
    return () => subscription.unsubscribe()
  }, [])



  return (
    <AuthContext value={claims}>
      {children}
    </AuthContext>
  )
}
