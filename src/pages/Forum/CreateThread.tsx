import { BackIcon } from "@/components/BackIcon";
import Divider from "@/components/Divider";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import type { formStates } from "@/types";
import { createThread } from "@/utils/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateThread() {

  // importing required hooks
  const navigate = useNavigate();
  const toast = useToast();
  const auth = useAuth();

  // states for form input fields
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");

  // overall state of form
  const [state, setState] = useState<formStates>("idle");


  // function to create new thread
  async function createNewThread() {
    // check if user is logged in before creating new thread
    if (!auth) {
      toast.error("You must be logged in to create a post");
      return;
    }

    setState("submitting");

    const { error } =  await createThread({ heading, body })
    if (error) {
      toast.error("An error occured.");
      setState("idle");
    } else {
      toast.success("Sucessfully created post!");
      setState("loading");
      navigate("/forum");
    }
  }



  return (
    <div className="createThread-page-container">
      <BackIcon />
      <div className="popout-container" style={{ textAlign: "left", minWidth: "500px" }}>
        <h2>Create new post</h2>
        <Divider />

        <div style={{ marginTop: "20px" }}>
          <h4>Heading:</h4>
          <input
            id="heading-input-field"
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            disabled={state === "submitting"}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <h4>Body:</h4>
          <textarea
            id="body-input-field"
            style={{ minWidth: "500px", minHeight: "100px" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={state === "submitting"}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={createNewThread}
            disabled={state === "submitting"}
          >
            Create post!</button>
        </div>
      </div>
    </div>
  )
}

export default CreateThread;
