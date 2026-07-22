import type { User } from "@/types";
import "./ProfilePopup.css"
import ProfilePic from "./ProfilePic";
import supabase from "@/utils/supabase";
import { useToast } from "@/contexts/ToastContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePopup({ user, show, onClose }: {user: User, show: boolean, onClose: () => void }) {
  const toast = useToast();
  const navigate = useNavigate();

  if (!show) return;

  return (
    <div className="profile-popup" onMouseLeave={onClose}>
      <div className="popout-container" style={{ marginTop: "5px"}}>

        <div className="table-row" style={{ gap: "20px", marginBottom: "var(--main-padding)"}}>
          <ProfilePic user={user}/>
          <div style={{ textAlign: "left"}}>
            <h3>{user.username}</h3>
            <p style={{ textDecoration: "underline"}}>{user.email}</p>
          </div>
        </div>

        <div className="table-row" style={{ fontSize: "11px", justifyContent: "center", gap: "10px", textWrap: "nowrap"}}>
          <button onClick={() => navigate("settings")}>
            Settings
          </button>
          <button onClick={() => navigate("/login")}>
            Switch account
          </button>
          <button onClick={async () => {
            const { error } = await supabase.auth.signOut();
            if (!error) {
              toast.success("Signed out!")
            }}}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  )

}
