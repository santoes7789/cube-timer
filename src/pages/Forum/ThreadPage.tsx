import { useToast } from "@/contexts/ToastContext";
import { getThread } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreadBlock } from "./ThreadBlock";
import type { Post, Thread } from "@/types";
import Divider from "@/components/Divider";
import { BackIcon } from "@/components/BackIcon";

function ThreadPage() {
  const { threadId } = useParams()
  const toast = useToast();

  const [ loading, setLoading ] = useState(true);
  const [ thread, setThread ] = useState<Thread | null>(null);
  const [ posts, setPosts ] = useState<Post[] | null>(null);


  // retrieve all posts on startup
  useEffect(() => {
    if (!threadId) {
      toast.error("No thread found");
      return
    }

    getThread(threadId).then((data) => {
      if (data === null) {
        toast.error("No thread found");
        return;
      }

      setThread(data.thread);
      setPosts(data.posts);
      setLoading(false);
    });

  }, [])


  return (
    <div className="forum-page-container">
      <BackIcon />
      <div className="thread-view-container">
        <div className="popout-container" style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "40px" }}>{thread?.heading}</h2>
              <h6>Posted on {thread?.timestamp.toLocaleString()}</h6>
            </div>
            <p style={{ marginLeft: "30px"}}>{thread?.body}</p>

          </div>

          <Divider />

          <div className="threadpage-post-container">
            <textarea
              id="body-input-field"
              style={{ minWidth: "500px", minHeight: "100px" }}
              placeholder="Add something to the discussion..."
              // value={body}
              // onChange={(e) => setBody(e.target.value)}
              // disabled={state === "submitting"}
            />
            <button>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreadPage;
