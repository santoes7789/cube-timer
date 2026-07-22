import { useToast } from "@/contexts/ToastContext";
import { createPost, getThread } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post, Thread } from "@/types";
import Divider from "@/components/Divider";
import { BackIcon } from "@/components/BackIcon";
import { useAuth } from "@/contexts/AuthContext";
import ProfilePic from "@/components/ProfilePic";

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
    console.log("testing")
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
  useEffect(getData, [threadId]);

  // function to submit new post
  async function submitPost() {
    if (!thread || !auth?.user) return;

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
            <div className="table-row" >
              <h2 style={{ fontSize: "40px" }}>{thread?.heading}</h2>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", justifyContent: "right", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                  <div>
                    <h4>{thread?.author.username}</h4>
                  </div>
                  <ProfilePic user={thread?.author} size={40} />
                </div>
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
                <div className="table-row" style={{ marginBottom: "5px" }}>
                  <div className="table-row">
                    <ProfilePic user={post.author} size={30} />
                    <h4 style={{ marginLeft: "10px" }}>{post.author.username}</h4>
                  </div>

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
