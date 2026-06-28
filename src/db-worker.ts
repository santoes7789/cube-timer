import db, { dbLastSynced } from "@/db/db";
import supabase from "./utils/supabase";

self.onmessage = async (event) => {
  const {type, data, auth} = event.data;
  switch(type) {
    case "UPDATE_DB":
      break;
    case "WIPE_DB":
      break;

    case "ADD_TIME":
      const id = await db.times.add({ ...data, synced: 0, uuid: crypto.randomUUID()});

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

async function getFromSupabase() {
  const sessionData = await supabase.from("sessions").select();
  const timesData = await supabase.from("times").select();
  if (sessionData.error || timesData.error) {
    throw Error();
  }

  const sess = sessionData.data.map((row) => ({
    uuid: row["uuid"],
    name: row["name"],
    created_at: row["created_at"],
    updated_at: row["timestamp"],
    user_id: row["user_id"],
  }));

  const times = timesData.data.map((row) => ({
    time: row["time"],
    timestamp: row["timestamp"],
    updated_at: row["updated_at"],
    session_uuid: row["session_uuid"],
    user_id: row["user_id"],
    modifier: row["modifier"],
    comment: row["commment"],
    scramble: row["scramble"],
  }));

  return { sessionData: sess, timesData: times };
}

async function updateDatabase(id: string) {
  // Check supabase lastest update
  const { data, error } = await supabase.functions.invoke("last-updated");

  if (error || data === null) {
    console.error(error);
    return;
  }

  const supabaseLastUpdated = data.updated_at;
  // Check local database latest update
  const localLastUpdated = dbLastSynced(id);

  // convert to js date object for comparison
  const supabaseTime = new Date(supabaseLastUpdated ?? 0);
  const localTime = new Date(localLastUpdated ?? 0);

  if (supabaseTime > localTime) {
    console.log("Server has updates");

    // pull changes
    const { data: timeData, error: timeError } = await supabase
      .from("times")
      .select()
      .gt("updated_at ", localTime.toISOString());

    const { data: sessionData, error: sessionError } = await supabase
      .from("sessions")
      .select()
      .gt("updated_at ", localTime.toISOString());

    if (timeError || sessionError) {
      console.log("Unable to retrieve updatek")
      return;
    }

    //apply changes
    const sess = sessionData.map((row) => ({
      uuid: row["uuid"],
      name: row["name"],
      created_at: row["created_at"],
      updated_at: row["updated_at"],
      user_id: row["user_id"],
      synced: 1,
    }));

    const times = timeData.map((row) => ({
      time: row["time"],
      timestamp: row["timestamp"],
      updated_at: row["updated_at"],
      session_uuid: row["session_uuid"],
      user_id: row["user_id"],
      modifier: row["modifier"],
      comment: row["commment"],
      scramble: row["scramble"],
      synced: 1,
    }));

    // setDbLastSynced(id, supabaseLastUpdated);
  } else {
    console.log("local db is up to date");
  }
}