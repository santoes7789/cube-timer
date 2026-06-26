import db from "@/db/db";

self.onmessage = async (event) => {
  const {type, data, auth} = event.data;
  switch(type) {
    case "UPDATE_DB":
      break;
    case "WIPE_DB":
      break;

    case "ADD_TIME":
      const id = await db.times.add({ ...data, synced: 0});

      self.postMessage({
        type: type,
        status: "success",
        data: id,
        message: "Added time to local db"
      })

      if (auth) {
        // Check for updates to prevent missing rows

        // Send update to server
      }
      break;
      

    case "UPDATE_TIME":
      await db.times.update(data.id, { ...data.updates, synced: 0, updated_at: new Date().toISOString() });

      self.postMessage({
        type: type,
        status: "success",
        data: "",
        message: "Updated time in local db"
      })
      break;


    case "DELETE_TIME":
      db.times.delete(data);
      self.postMessage({
        type: type,
        status: "success",
        data: "",
        message: "Deleted time in local db"
      })
      break;


    case "ADD_SESSION":
      const randUUID = crypto.randomUUID();
      await db.sessions.add({
        ...data,
        uuid: randUUID,
        synced: 0,
      })

      self.postMessage({
        type: type,
        status: "success",
        data: randUUID,
        message: "Added new session to local db"
      })
      break;



    case "UPDATE_SESSION":
      await db.sessions.update(data.id, { ...data.updates, synced: 0, updated_at: new Date().toISOString() });
      self.postMessage({
        type: type,
        status: "success",
        data: data.id,
        message: "Updated session in local db"
      })
      break;


    case "DELETE_SESSION":
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