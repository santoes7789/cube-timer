import { ChartLine, CircleUser, LogOut, Settings  } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import supabase from "@/utils/supabase";

// Nav buttons for the timer page
function NavButtons() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={Settings} size={30} onClick={() => navigate("/timer/settings")}/>
      {auth?.session ?
        <IconButton icon={LogOut} size={30} onClick={() => { supabase.auth.signOut() }}/> :
        <IconButton icon={CircleUser} size={30} onClick={() => { navigate("/login")}}/>
      }
      <IconButton icon={ChartLine} size={30} onClick={() => navigate("stats")} />
    </div>
  );
}

export default NavButtons;
