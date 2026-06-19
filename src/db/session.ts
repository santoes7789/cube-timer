import { Entity } from "dexie"
import Database from "./db";

export class Session extends Entity<Database> {
  id!: number;
  name!: string;
  created_at!: number;
  updated_at!: number;
}