import Divider from "@/components/Divider";
import ProfilePic from "@/components/ProfilePic";
import type { Thread } from "@/types";
import { useNavigate } from "react-router-dom";

export function ThreadBlock({ thread }: { thread: Thread; isAuthor: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      className="popout-container threadblock-container"
      onClick={() => navigate(`/forum/${thread.id}`)}
    >
      <div className="threadblock-information-container">
        <h2>{thread.heading}</h2>
        <h6 style={{ textAlign: "right" }}>
          <div className="table-row" style={{ justifyContent: "right", gap: "10px" }}>
            <h3>{thread.author.username}</h3>
            <ProfilePic user={thread.author} size={25} />
          </div>
          <div style={{ color: "var(--faded-color)"}}>{thread.timestamp.toLocaleString()}</div>
        </h6>
      </div>
      <Divider />
      <p style={{ margin: "10px", marginBottom: "0px" }}>{thread.body}</p>
    </div>
  );
}
