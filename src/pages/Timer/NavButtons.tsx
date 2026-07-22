import { ChartLine, CircleUser, Icon, LogOut, MessagesSquare, Settings, Timer, UserLock } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import supabase from "@/utils/supabase";
import { useToast } from "@/contexts/ToastContext";
import Divider from "@/components/Divider";
import ProfilePic from "@/components/ProfilePic";
import ProfilePopup from "@/components/ProfilePopup";
import { useState } from "react";

function NavButtons() {
  const navigate = useNavigate();
  const auth = useAuth();
  const toast = useToast();

  const [profilePopup, setProfilePopup] = useState(false);

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={Settings} size={30} onClick={() => navigate("/timer/settings")} />
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
      <IconButton icon={ChartLine} size={30} onClick={() => navigate("/stats")} />
      <Divider orientation="vertical"/>
      <IconButton icon={MessagesSquare} size={30} onClick={() => navigate("/forum")} />
    </div>
  );
}

export default NavButtons;
