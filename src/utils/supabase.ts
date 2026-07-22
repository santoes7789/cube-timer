import db from "@/db/db";
import type { Time } from "@/db/times";
import type { Post, Thread, User } from "@/types";
import { createClient } from "@supabase/supabase-js";
import imageCompression from "browser-image-compression";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// function to signup
export async function signup({ username, email, password, }: { username: string; email: string; password: string; }) {

  // adding to auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return false;
  }

  if (data.user === null) return false;

  // adding profile data
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({ id: data.user.id, username, email });

  if (profileError) {
    console.error(profileError);
    return false;
  }
  return true;
}

// function to create a new thread using heading and body information
export async function createThread({ heading, body, }: { heading: string; body: string; }) {
  const response = await supabase.functions.invoke("create-thread", {
    body: { heading, body },
  });
  return response;
}

export async function createPost( thread_id: string, body: string, author_id: string ) {
  const response = await supabase
    .from("posts")
    .insert({ thread_id, body, author_id });
  if (response.error) {
    console.error(response.error);
  }
  return response;
}

// function to retrieve threads and posts
export async function getThreads() {
  // get latest threads
  const { data } = await supabase
    .from("threads")
    .select(
      "id, heading, profiles!threads_author_id_fkey(id, username, email, avatar_updated_at), created_at, posts!threads_first_post_id_fkey(body)",
    )
    .order("created_at", { ascending: false })
    .limit(20);

  if (data) {
    const threads: Thread[] = data.map((row) => ({
      id: row.id as string,
      heading: row.heading as string,
      author: {
        id: row.profiles.id,
        username: row.profiles.username,
        email: row.profiles.email,
        avatarUpdatedAt: new Date(row.profiles.avatar_updated_at)
      },
      body: row.posts.body as string,
      timestamp: new Date(row.created_at),
    }));

    console.log(JSON.stringify(threads, null, 2));
    return threads;
  }
  return [];
}

// function to get all posts from a specific thread
export async function getThread(threadId: string) {
  const { data } = await supabase
    .from("threads")
    .select(
      `id,
      heading,
      profiles!threads_author_id_fkey(id, username, email, avatar_updated_at),
      created_at,
      posts!posts_thread_id_fkey(id, body, profiles!posts_author_id_fkey(id, username, email), created_at)`,
    )
    .eq("id", threadId)
    .order("created_at", { ascending: true, referencedTable: "posts" })
    .limit(1)
    .single();

  if (!data) return null;
  const thread: Thread = {
    id: data.id,
    heading: data.heading,
    body: data.posts[0].body,
    author: {
      id: data.profiles.id,
      username: data.profiles.username,
      email: data.profiles.email,
      avatarUpdatedAt: new Date(data.profiles.avatar_updated_at)
    },

    timestamp: new Date(data.created_at),
  };

  const posts: Post[] = data.posts.map((row) => ({
    id: row.id.toString() as string,
    author: {
      id: row.profiles.id,
      username: row.profiles.username,
      email: row.profiles.email,
      avatarUpdatedAt: new Date(row.profiles.avatar_updated_at)
    },
    body: row.body as string,
    timestamp: new Date(row.created_at),
  }));

  return { thread, posts };
}

export function getProfilePictureURL(user: User) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(user.id);
  return `${data.publicUrl}?v=${user.avatarUpdatedAt}`;
}

export async function uploadProfilePicture(user_id: string, file: File) {
  // convert image to 256 x 256 webp image
  const webpFile = await imageCompression(file, {
    maxWidthOrHeight: 256,
    fileType: "image/webp",
    initialQuality: 0.8,
  })
  const { error: avatarError } = await supabase.storage.from("avatars").upload(user_id, webpFile, { upsert: true });
  const { error: profileError } = await supabase.from("profiles")
    .update({ avatar_updated_at: new Date().toISOString() })
    .eq("id", user_id);
  return (avatarError === null) && (profileError === null);
}

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
    username: data.username,
    email: data.email,
    avatarUpdatedAt: data.avatar_updated_at
  }

  return user;
}



export async function updateLocalDB(user_id: string) {
  const unsyncedSessions = await db.sessions
    .where("synced")
    .equals(0)
    .filter((row) => row.user_id === user_id)
    .toArray();
  const unsyncedTimes = await db.times
    .where("synced")
    .equals(0)
    .filter((row) => row.user_id === user_id)
    .toArray();

  // add sessions first since time relies on sessions
  const { data, error } = await supabase.functions.invoke("add-sessions", {
    body: unsyncedSessions,
  });
  if (error) return;

  const updates = await Promise.all(
    data.data.map(async (item: any) => {
      const key = await db.sessions.where("uuid").equals(item.uuid).first();
      return {
        key: key?.id,
        changes: {
          synced: 1,
        },
      };
    }),
  );
  // set those sessions as synced
  await db.sessions.bulkUpdate(updates);

  // add times
  const { data: timeData, error: timeError } = await supabase.functions.invoke(
    "add-times",
    {
      body: unsyncedTimes,
    },
  );

  if (timeError) return;

  const timeUpdates = await Promise.all(
    timeData.data.map(async (item: any) => {
      const key = await db.times
        .where("timestamp")
        .equals(new Date(item.timestamp).toISOString())
        .first();
      return {
        key: key?.id,
        changes: {
          synced: 1,
        },
      };
    }),
  );
  // set those times as synced
  await db.times.bulkUpdate(timeUpdates);
}

export async function addTimeToSupabase(times: Partial<Time>[]) {
  // get unsynced data
  supabase.functions.invoke("add-times", {
    body: times,
  });
}


export default supabase;
