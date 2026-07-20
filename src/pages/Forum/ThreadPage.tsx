import { useToast } from "@/contexts/ToastContext";
import { createPost, getThread } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post, Thread } from "@/types";
import Divider from "@/components/Divider";
import { BackIcon } from "@/components/BackIcon";
import { useAuth } from "@/contexts/AuthContext";

function ThreadPage() {
  const { threadId } = useParams();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [postBody, setPostBody] = useState("");
  const [submittingPost, setSubmittingPost] = useState(false);

  const auth = useAuth();

  // function to retrieve data from server and update ui
  function getData() {
    if (!threadId) {
      toast.error("No thread found");
      return;
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
  }

  // retrieve all posts on startup
  useEffect(getData);

  // function to submit new post
  async function submitPost() {
    if (!thread || !auth) return;

    if (postBody.trim().length === 0) {
      toast.error("Post cannot be empty");
      return;
    }

    setSubmittingPost(true);
    const response = await createPost(thread.id, postBody, auth.user.id);

    if (response.error) {
      toast.error("An error occured.");
    } else {
      toast.success("Post sucessfully created!");
      getData();
      setPostBody("");
    }
    setSubmittingPost(false);
  }

  return (
    <div className="forum-page-container">
      <BackIcon />
      <div className="thread-view-container">
        <div className="popout-container" style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 style={{ fontSize: "40px" }}>{thread?.heading}</h2>
              <div style={{ textAlign: "right" }}>
                <h4>{thread?.author.username}</h4>
                <h6>Posted on {thread?.timestamp.toLocaleString()}</h6>
              </div>
            </div>
            <p style={{ marginLeft: "30px" }}>{thread?.body}</p>
          </div>
          <Divider type="thick" />

          {posts?.length === 1 &&
            <div style={{ color: "var(--faded-color)"}} className="threadpage-post-container" >
              No comments yet. Be the first!
            </div>
          }

          {posts?.map((post, index) => {

            if (index === 0) return;
            return (
              <div key={post.id} className="threadpage-post-container">
                <div style={{ display: "flex", justifyContent: "space-between"}}>
                  <h4> - {post.author.username}</h4>
                  {post.timestamp.toDateString()}
                </div>
                {post.body}
              </div>
            );
          })}

          <Divider />

          <div className="threadpage-input-post-container">
            <textarea
              id="body-input-field"
              style={{ minWidth: "500px", minHeight: "100px" }}
              placeholder="Add something to the discussion..."
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              disabled={submittingPost}
            />
            <button onClick={submitPost} disabled={submittingPost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThreadPage;
