import db, { setDbLastSynced } from "@/db/db";
import type { Time } from "@/db/times";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function updateSupabase(user_id: string) {
  const unsyncedSessions = await db.sessions.where("synced").equals(0).filter(row => row.user_id === user_id).toArray();
  const unsyncedTimes = await db.times.where("synced").equals(0).filter(row => row.user_id === user_id).toArray();

  // add sessions first since time relies on sessions
  const { data, error } = await supabase.functions.invoke("add-sessions", {
    body: unsyncedSessions,
  })
  if (error) return;

  const updates = await Promise.all(data.data.map(async (item: any) => {
    const key = await db.sessions.where("uuid").equals(item.uuid).first();
    return {
      key: key?.id,
      changes: {
        synced: 1,
      }
    }
  }))
  // set those sessions as synced
  await db.sessions.bulkUpdate(updates);

  // add times 
  const {data: timeData, error: timeError} = await supabase.functions.invoke("add-times", {
    body: unsyncedTimes,
  })
  
  if (timeError) return;

  const timeUpdates = await Promise.all(timeData.data.map(async (item: any) => {
    const key = await db.times.where("timestamp").equals(new Date(item.timestamp).toISOString()).first();
    return {
      key: key?.id,
      changes: {
        synced: 1,
      }
    }
  }))
  // set those times as synced
  await db.times.bulkUpdate(timeUpdates);
}


export async function addTimeToSupabase(times: Partial<Time>[]) {
  // get unsynced data
  supabase.functions.invoke("add-times", {
    body: times,
  });
}

export function helloSupabase(name: string) {
  supabase.functions.invoke("hello-world", {
    body: { name: name },
  });
}

export default supabase;
