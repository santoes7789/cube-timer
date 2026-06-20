import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateSupabase(newRows) {
  console.log("hello");
  // const { data, error } = await supabase
  //   .from("times")
  //   .insert({ ...newRows, user_id: "38cb9603-203b-4a80-b7a3-d7b2bec761ba" })
  //   .select();
  console.log(error);
  // supabase.functions.invoke("update-table", {
  //   body: { times: newRows },
  // });
}

export function helloSupabase(name: string) {
  supabase.functions.invoke("hello-world", {
    body: { name: name },
  });
}

export default supabase;
