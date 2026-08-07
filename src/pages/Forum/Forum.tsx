import "./Forum.css";
import Divider from "@/components/Divider";
import { getThreads } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThreadBlock } from "./ThreadBlock";
import type { Thread } from "@/types";
import ForumNavButtons from "./ForumNavButtons";
import { useAuth } from "@/contexts/AuthContext";

function Forum() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState<Thread[]>([]);

  const [threadToDelete, setThreadToDelete] = useState<Thread | null>(null);

  const auth = useAuth();

  useEffect(() => {
    getThreads().then((threads) => {
      setThreads(threads);
      setLoading(false);
    });
  }, []);

  return (
    <div className="forum-page-container">
      <ForumNavButtons />
      <div className="forum-heading-container">
        <div className="popout-container" style={{ backgroundColor: "var(--bg-dark)", height: "100px", padding: '35px', display: "flex" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%"}}>
            <div>
              <h1>Forum</h1>
              <p style={{ color: "var(--faded-color)"}}>Share ideas, ask questions and connect with the community</p>
            </div>
            <button onClick={() => navigate("/forum/create")}>Create new post</button>
          </div>
        </div>
      </div>
      {/*<div style={{ margin: "20px 0px"}}>*/}
      <Divider margin={"20px"} />
      {/*</div>*/}


      {loading ? (
        <div className="thread-view-container">Loading...</div>
      ) : (
        <div className="thread-view-container">
          {threads.map((thread) => (
            <ThreadBlock key={thread.id} thread={thread} isAuthor={thread.author.id === auth?.user?.id} />
          ))}
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Forum;
