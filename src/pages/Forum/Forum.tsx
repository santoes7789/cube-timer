import "./Forum.css";
import Divider from "@/components/Divider";
import { getThreads } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ThreadBlock } from "./ThreadBlock";
import type { Thread } from "@/types";
import ForumNavButtons from "./ForumNavButtons";
import { useAuth } from "@/contexts/AuthContext";
import { Search, X } from "lucide-react";
import { IconButton } from "@/components/IconButton";

function Forum() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [threads, setThreads] = useState<Thread[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

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
        <div className="popout-container" style={{ backgroundColor: "var(--bg-darker)", height: "100px", padding: '35px', display: "flex" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", width: "100%"}}>
            <div>
              <h1>Forum</h1>
              <p style={{ color: "var(--faded-color)"}}>Share ideas, ask questions and connect with the community</p>
            </div>
            {auth &&
              <button onClick={() => navigate("/forum/create")}>Create new post</button>
            }
          </div>
        </div>
      </div>

      <Divider margin={"20px"} />


      <div className="thread-view-container">
        {/*search bar*/}
        <div className="popout-container search-bar">
          <Search />
          <input placeholder="Search for something..." onChange={(e) => setSearchTerm(e.target.value)} name="searchField"/>
          { searchTerm &&
            <IconButton icon={X} size={25} onClick={() => setSearchTerm("")} />
          }
        </div>

        <div className="threads-container-parent">
          {loading ? "Loading..."  : (
            <div className="threads-container">
              {threads.filter((item) =>
                item.heading.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                item.body.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ).
              map((thread) => (
                <ThreadBlock key={thread.id} thread={thread} isAuthor={thread.author.id === auth?.user?.id} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Forum;
