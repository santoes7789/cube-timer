import type { SessionType } from "@/types";
import { db } from "./db";

export async function addSession(session: Omit<SessionType, "id">) {
  return await db.session.add(session)
}

export async function updateSession(id: number, updates: Partial<SessionType>) {
  return await db.session.update(id, { ...updates })
}

export async function deleteSession(id: number) {
  console.log("Deleting session: ", id);
  await db.times
    .where("session")
    .equals(id)
    .delete();
  return await db.session.delete(id);
}
