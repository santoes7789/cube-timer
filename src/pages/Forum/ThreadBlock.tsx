import Divider from "@/components/Divider";
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
        <h6 style={{ textAlign: "right", marginTop: "20px" }}>
          <div>{thread.author.username}</div>
          <div>{thread.timestamp.toLocaleString()}</div>
        </h6>
      </div>
      <Divider />
      <p>{thread.body}</p>
    </div>
  );
}
