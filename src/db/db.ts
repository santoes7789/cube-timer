import { Dexie, type EntityTable } from "dexie";
import supabase from "@/utils/supabase";
import { Time } from "./times";
import { Session } from "./session";


export default class Database extends Dexie {
  times!: EntityTable<Time, "id">
  sessions!: EntityTable<Session, "id">

  constructor(name : string) {
    super(name)
    this.version(1).stores({
      times: "++id, time, session_id, timestamp, modifier, comment, scramble, updated_at",
      sessions: "++id, name, created_at, updated_at"
    })
    this.on("populate", () => {
      this.sessions.add({name: "3x3", created_at: Date.now(), updated_at: Date.now()})
    })
    this.sessions.mapToClass(Session);
    this.times.mapToClass(Time);
  }
}


