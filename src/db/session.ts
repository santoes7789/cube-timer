import { Entity } from "dexie";
import { Database } from "./db";

export class Session extends Entity<Database> {
  id!: number;
  uuid!: string;
  name!: string;
  created_at!: string;
  updated_at!: string;
  user_id!: string;
}
