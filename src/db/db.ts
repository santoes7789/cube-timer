import { Dexie, type EntityTable } from "dexie";
import { Time } from "./times";
import { Session } from "./session";

export class Database extends Dexie {
  times!: EntityTable<Time, "id">;
  sessions!: EntityTable<Session, "id">;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      times:
        "++id, time, user_id, session_uuid, timestamp, modifier, comment, scramble, updated_at, [user_id+session_uuid], synced",
      sessions: "++id, uuid, name, created_at, updated_at, user_id, synced",
    });
    this.on("populate", () => {
      this.addDefaultSession("default");
    });
    this.sessions.mapToClass(Session);
    this.times.mapToClass(Time);
  }

  addDefaultSession(user_id: string) {
    console.log("adding ", user_id);
    const now = new Date().toISOString();
    const randUUID = crypto.randomUUID();
    this.sessions.add({
      name: "3x3",
      uuid: randUUID,
      created_at: now,
      updated_at: now,
      user_id: user_id,
      synced: 0,
    });
    return randUUID;
  }
}

export function dbLastSynced(id: string) {
  try {
    return localStorage.getItem(`lastUpdated${id}`);
  } catch (err) {
    console.warn("localStorage failed:", err);
    return null;
  }
}

export function setDbLastSynced(id: string, timestamp: string) {
  try {
    localStorage.setItem(`lastUpdated${id}`, timestamp);
    return true;
  } catch (err) {
    console.warn("localStorage failed:", err);
    return false;
  }
}

const db = new Database("database");
export default db;
