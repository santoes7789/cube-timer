import type { SessionType } from "@/types";
import { db } from "./db";

export async function addSession(session: Omit<SessionType, "id">) {
  return await db.session.add(session)
}
