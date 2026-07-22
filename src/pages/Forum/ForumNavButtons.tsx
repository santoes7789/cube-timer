import { CircleUser, Settings, Timer } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfilePic from "@/components/ProfilePic";
import Divider from "@/components/Divider";
import ProfilePopup from "@/components/ProfilePopup";
import { useState } from "react";

function ForumNavButtons() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [profilePopup, setProfilePopup] = useState(false);

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={Settings} size={30} onClick={() => navigate("/forum/settings")} />
      {auth?.user ?
        <>
          <ProfilePic user={auth.user}
            size={29}
            clickable
            onClick={() => setProfilePopup(prev => !prev)}
          />
          <ProfilePopup show={profilePopup} onClose={() => setProfilePopup(false)} user={auth.user} />
        </>
        :
        <IconButton icon={CircleUser} size={30} onClick={() => {
          navigate("/login");
        }}/>
      }
      <Divider orientation="vertical"/>
      <IconButton icon={Timer} size={30} onClick={() => navigate("/timer")} />
    </div>
  );
}

export default ForumNavButtons;
