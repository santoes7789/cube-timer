import { Dexie, type EntityTable} from "dexie";
import type { SessionType, Timetype } from "@/types";

const db = new Dexie("timesDatabase") as Dexie & {
  times: EntityTable<Timetype, "id">,
  session: EntityTable<SessionType, "id">
}

db.version(1).stores({
  times: "++id, time, session, timestamp, modifier, comment",
  session: "++id, name, timestamp"
})

db.on('populate', async () => {
  await db.session.add({ name: "3x3", timestamp: Date.now()});
});

export { db }

