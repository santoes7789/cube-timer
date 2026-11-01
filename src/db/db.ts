import { Dexie, type EntityTable } from "dexie";
import { Time } from "./times";
import { Session } from "./session";

export class Database extends Dexie {
  times!: EntityTable<Time, "id">;
  sessions!: EntityTable<Session, "uuid">;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      times: "++id, time, user_id, session_uuid, timestamp, modifier, comment, scramble, updated_at, [user_id+session_uuid], synced, &uuid",
      sessions: "&uuid, name, created_at, updated_at, user_id, synced",
    });
    this.on("populate", () => {
      this.addDefaultSession("local");
    });
    this.sessions.mapToClass(Session);
    this.times.mapToClass(Time);

  }

  async addDefaultSession(user_id: string) {
    const now = new Date().toISOString();
    const randUUID = crypto.randomUUID();
    await this.sessions.add({
      uuid: randUUID,
      name: "3x3",
      created_at: now,

      updated_at: now,
      user_id: user_id,
      synced: 0,
    });
    return randUUID;
  }
}

const db = new Database("database");
export default db;
