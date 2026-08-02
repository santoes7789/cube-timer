import { useToast } from "@/contexts/ToastContext";
import { createPost, deletePost, deleteThread, getThread } from "@/utils/supabase";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post, Thread } from "@/types";
import Divider from "@/components/Divider";
import { BackIcon } from "@/components/BackIcon";
import { useAuth } from "@/contexts/AuthContext";
import ProfilePic from "@/components/ProfilePic";
import Popup from "@/components/Popup";
import { DeleteOptionsButton } from "./DeleteOptionsButton";

function ThreadPage() {
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [deleteThreadPopup, setDeleteThreadPopup] = useState(false);

  const { threadId } = useParams();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [postBody, setPostBody] = useState("");
  const [submittingPost, setSubmittingPost] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

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
          <div className="thread-view-container-thread-post">

            {/* Heading of Thread */}
            <div className="table-row" >
              <h2 style={{ fontSize: "40px" }}>{thread?.heading}</h2>

              <div className="thread-info-container" style={{ textAlign: "right" }}>
                <div style={{ display: "flex", justifyContent: "right", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                  <div>
                    <h4>{thread?.author.username}</h4>
                  </div>
                  <ProfilePic user={thread?.author} size={40} />
                  {thread?.author.id === auth?.user?.id && <DeleteOptionsButton onDelete={() => {
                    setDeleteThreadPopup(true);
                  }} />}
                </div>
                <h6>Posted on {thread?.timestamp.toLocaleString()}</h6>
              </div>
            </div>
            <p style={{ marginLeft: "30px" }}>{thread?.body}</p>
          </div>



          <Divider type="thick" />

          {/* Beginning of posts/comments */}
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

                  <div className="table-row">
                    {post.timestamp.toDateString()}
                    {post.author.id === auth?.user?.id && <DeleteOptionsButton onDelete={() => {
                      setPostToDelete(post);
                    }}/>}
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {post.body}
                </div>
              </div>
            );
          })}

          <Divider />
          {/* Input field for new comment/post */}
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


      {/* Delete post popup */}
      <Popup show={postToDelete !== null} onClose={() => setPostToDelete(null)}>
        <div style={{ maxWidth: "500px"}}>
          <h3>
            Are you sure you want to delete this post?
          </h3>
          <div style={{ textAlign: "left", margin: "20px"}}>
            <h5>Posted on: {postToDelete?.timestamp.toLocaleString()}</h5>
            {postToDelete?.body}
          </div>
          <div className="table-row" style={{ justifyContent: "right", gap: "20px"}}>
            <button onClick={() => setPostToDelete(null)}>No</button>
            <button onClick={() => {
              deletePost(postToDelete!.id).then((success) => {
                if (success) {
                  getData();
                  toast.success("Successfully deleted post");
                } else {
                  toast.error("Failed to delete post");
                }
              });
              setPostToDelete(null);
            }} className="button-danger">Yes</button>
          </div>
        </div>
      </Popup>

      {/* Delete thread popup */}
      <Popup show={deleteThreadPopup && thread} onClose={() => setDeleteThreadPopup(false)}>
        <div style={{ maxWidth: "500px"}}>
          <h3>
            Are you sure you want to delete this thread?
          </h3>
          <div style={{ textAlign: "left", margin: "20px 20px 0px 20px"}}>
            <h5 style={{ marginBottom: "10px" }}>Posted on: {thread?.timestamp.toLocaleString()}</h5>
            <h4>
              {thread?.heading}
            </h4>
            {thread?.body}
          </div>

          <h4 style={{ margin: "20px", color: "red"}}>
            This action cannot be undone
          </h4>
          <div className="table-row" style={{ justifyContent: "right", gap: "20px"}}>
            <button onClick={() => setDeleteThreadPopup(false)}>No</button>
            <button onClick={() => {
              deleteThread(thread!.id).then((success) => {
                if (success) {
                  toast.success("Deleted thread sucessfully!")
                  navigate("/forum");
                } else {
                  toast.error("Failed to delete thread")
                  setDeleteThreadPopup(false);
                }
              })
            }} className="button-danger">Yes</button>
          </div>
        </div>
      </Popup>
    </div>
  );
}


export default ThreadPage;
