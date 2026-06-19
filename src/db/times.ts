import Database from "./db";
import { Entity } from "dexie";

export class Time extends Entity<Database> {
  id!: number;
  time!: number;
  timestamp!: number;
  updated_at!: number;
  session_id!: number;
  modifier?: string;
  comment?: string;
  scramble?: string;
}

