import db  from "@/db/db";
import type { Time } from "@/db/times";
import type { Post, Thread } from "@/types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);




// function to create a new thread using heading and body information
export async function createThread({ heading, body }: { heading: string, body: string }) {
  const response = await supabase.functions.invoke("create-thread", {
    body: { heading, body }
  });

  return response;
}

export async function createPost(thread_id: string, body: string, author_id: string) {
  const response = await supabase.from("posts").insert({ thread_id, body, author_id });
  if (response.error) {
    console.error(response.error)
  }
  return response
}

// function to retrieve threads and posts
export async function getThreads() {
  // get latest threads
  const { data } = await supabase
    .from("threads")
    .select("id, heading, author_id, created_at, posts!threads_first_post_id_fkey(body)")
    .order("created_at", { ascending: false })
    .limit(20)

  if (data) {
    const threads: Thread[] = data.map((row) => ({
      id: row.id as string,
      heading: row.heading as string,
      author: row.author_id as string,
      body: row.posts.body as string,
      timestamp: new Date(row.created_at),
    }))
    return threads;
  }
  return [];
}


// function to get all posts from a specific thread
export async function getThread(threadId: string) {
  const { data } = await supabase
    .from("threads")
    .select("id, heading, author_id, created_at, posts!posts_thread_id_fkey(id, body, author_id, created_at)")
    .eq("id", threadId)
    .order("created_at", { ascending: true, referencedTable: "posts"})
    .limit(1)
    .single();

  if (!data) return null;
  const thread: Thread = {
    id: data.id,
    heading: data.heading,
    body: data.posts[0].body,
    author: data.author_id,
    timestamp: new Date(data.created_at),
  }

  const posts: Post[] = data.posts.map((row) => ({
    id: row.id.toString(),
    author: row.author_id,
    body: row.body,
    timestamp: new Date(row.created_at)
  }))

  return { thread, posts }

}











export async function updateLocalDB(user_id: string) {
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
  const { data: timeData, error: timeError } = await supabase.functions.invoke("add-times", {
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
