import db from "@/db/db";
import type { Time } from "@/db/times";
import type { User } from "@/types";
import { createClient } from "@supabase/supabase-js";
import { defaultSettings, type Settings } from "@/contexts/SettingsContext";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// function to signup
export async function signup({ email, password, }: { email: string; password: string; }) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error(error);
    return false;
  }

  if (data.user === null) return false;

  // adding profile data
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user.id, email, settings: defaultSettings });

  if (profileError) {
    console.error(profileError);
    return false;
  }

  return true;
}

// Function to get user information based on user id
export async function getUser(user_id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  const user: User = {
    id: data.id,
    email: data.email,
    avatarUpdatedAt: data.avatar_updated_at
  }

  return user;
}

// Save user settings to supabase
export async function saveSettings(settings: Settings, user_id: string) {
  const { error } = await supabase
    .from("profiles")
    .update({ settings: settings })
    .eq("id", user_id);

  return error === null;
}

// Get users settings from supabase
export async function getSettings(user_id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("settings")
    .eq("id", user_id);

  if (error) {
    console.error(error);
    return null;
  }

  if (data.length > 0) {
    return data[0].settings;
  } else {
    console.log("No settings found")
    return defaultSettings;
  }
}

export async function sendChangesToSupabase(user_id: string) {
  const sessionData = (await db.sessions
    .where("synced")
    .equals(0)
    .toArray())
    .filter((e) => e.user_id === user_id);

  await supabase.functions.invoke("add-sessions", {
    body: sessionData,
  })
}

export async function addTimeToSupabase(times: Partial<Time>[]) {
  // get unsynced data
  supabase.functions.invoke("add-times", {
    body: times,
  });
}


export default supabase;
