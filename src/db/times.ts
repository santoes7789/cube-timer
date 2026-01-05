import type { Timetype } from "@/types";
import { db } from "./db";

export async function addTime(time: Omit<Timetype, "id">) {
  return await db.times.add(time)
}

