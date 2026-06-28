import db, { Database } from "./db";
import { Entity } from "dexie";

export class Time extends Entity<Database> {
  id!: number;
  time!: number;
  timestamp!: string;
  updated_at!: string;
  session_uuid!: string;
  modifier?: string;
  comment?: string;
  scramble?: string;
  user_id!: string;
  synced!: number;
  uuid!: string;
}

