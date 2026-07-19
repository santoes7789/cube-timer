import "./Forum.css";
import Divider from "@/components/Divider";
import { getThreads } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreadBlock } from "./ThreadBlock";
import type { Thread } from "@/types";

function Forum() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    getThreads().then((threads) => {
      setThreads(threads);
      setLoading(false);
    });
  }, []);

  return (
    <div className="forum-page-container">
      <h1>Forum</h1>
      <button onClick={() => navigate("/forum/create")}>create</button>
      <Divider />

      {loading ? (
        <div className="thread-view-container">Loading...</div>
      ) : (
        <div className="thread-view-container">
          {threads.map((thread) => (
            <ThreadBlock key={thread.id} thread={thread} isAuthor />
          ))}
        </div>
      )}
    </div>
  );
}

export default Forum;
