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

  // returns the value in milliseconds, taking into account +2 modifier
  getTimeValue() {
    return this.time + (this.modifier == "+2" ? 2000 : 0);
  }

  // same as getTimeValue, but returns null if the time is a dnf
  getTimeValueDnfIsNull() {
    if(this.modifier == "dnf") return null;
    return this.getTimeValue();
  }

  // returns formatted string taking into account modifiers
  getFormattedTimeValue() {
    return (this.getTimeValue() / 1000).toFixed(3) + (this.modifier == "+2" ? "+" : "");
  }

}

