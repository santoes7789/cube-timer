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
        "++id, time, user_id, session_id, timestamp, modifier, comment, scramble, updated_at, [user_id+session_id]",
      sessions: "++id, name, created_at, updated_at, user_id",
    });
    this.on("populate", () => {
      this.addDefaultSession("default");
    });
    this.sessions.mapToClass(Session);
    this.times.mapToClass(Time);
  }

  addDefaultSession(user_id: string) {
    const now = new Date().toISOString();
    const id = this.sessions.add({
      name: "3x3",
      created_at: now,
      updated_at: now,
      user_id: user_id,
    });
    return id;
  }

  async lastUpdated(user_id: string) {
    const last_updated = await this.times
      .where("user_id")
      .equals(user_id)
      .reverse()
      .sortBy("updated_at");
    return last_updated[0].updated_at;
  }
}

const db = new Database("database");
export default db;
