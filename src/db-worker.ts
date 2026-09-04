// db worker runs on a separate thread, so can execute tasks without interfereing with main ui

import db, { dbLastSynced } from "@/db/db";
import supabase from "./utils/supabase";

self.onmessage = async (event) => {
  const {type, data, auth} = event.data;
  switch(type) {
    case "ADD_TIME": {
      // Add time to db
      const time = {...data, synced: 0, uuid: crypto.randomUUID()}
      const id = await db.times.add(time);
      self.postMessage({
        type: type,
        status: "success",
        data: id,
        message: "Added time to local db"
      })
      break;
    }


    case "UPDATE_TIME":
    // Update time in db
      await db.times.update(data.id, { ...data.updates, synced: 0, updated_at: new Date().toISOString() });

      self.postMessage({
        type: type,
        status: "success",
        data: "",
        message: "Updated time in local db"
      })
      break;


    case "DELETE_TIME":
    // Delete time in db
      db.times.delete(data);
      self.postMessage({
        type: type,
        status: "success",
        data: "",
        message: "Deleted time in local db"
      })
      break;


    case "ADD_SESSION": {
      // Add session to db
      const randUUID = crypto.randomUUID();
      const session = { ...data, uuid: randUUID, synced: 0 }
      await db.sessions.add(session);

      self.postMessage({
        type: type,
        status: "success",
        data: randUUID,
        message: "Added new session to local db"
      })

      break;
    }

    case "UPDATE_SESSION":
      // update session in db
      await db.sessions.update(data.id, { ...data.updates, synced: 0, updated_at: new Date().toISOString() });
      self.postMessage({
        type: type,
        status: "success",
        data: data.id,
        message: "Updated session in local db"
      })
      break;


    case "DELETE_SESSION":
      // delete session in db
      await db.times.where("[user_id+session_uuid]").equals([auth, data.uuid]).delete();
      await db.sessions.where("uuid").equals(data.uuid).delete();
      self.postMessage({
        type: type,
        status: "success",
        data: "",
        message: `Deleted session ${data.uuid} in local db`
      })
      break;
  }
}
