import { Entity } from "dexie";
import { Database } from "./db";

export class Session extends Entity<Database> {
  uuid!: string;
  name!: string;
  created_at!: string;

  updated_at!: string;
  user_id!: string;
  synced!: number;
}
