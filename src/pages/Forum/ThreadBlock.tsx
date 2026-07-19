import Divider from "@/components/Divider";
import type { Thread } from "@/types";
import { useNavigate } from "react-router-dom";

export function ThreadBlock({ thread }: { thread: Thread, isAuthor: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="popout-container threadblock-container" onClick={() => navigate(`/forum/${thread.id}`)}>
      <h3>{thread.heading}</h3>
      <div className="threadblock-information-container">
        <h6></h6>
        <h6>{thread.timestamp.toLocaleString()}</h6>
      </div>
      <Divider />
      <p>{thread.body}</p>
    </div>
  )
}
