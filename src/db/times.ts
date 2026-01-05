import type { Timetype } from "@/types";
import { db } from "./db";

export async function addTime(time: Omit<Timetype, "id">) {
  return await db.times.add(time)
}

export async function updateFriend(id: number, updates: Partial<Timetype>) {
  return await db.times.update(id, { ...updates })
}

export async function deleteTime(id: number) {
  return await db.times.delete(id);
}

