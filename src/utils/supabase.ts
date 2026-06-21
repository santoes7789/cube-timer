import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateSupabase(newRows) {
  // get unsynced data
  supabase.functions.invoke("add-times", {
    body: newRows,
  });
}

export function helloSupabase(name: string) {
  supabase.functions.invoke("hello-world", {
    body: { name: name },
  });
}

export default supabase;
