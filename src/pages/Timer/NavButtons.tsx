import { ChartLine, CircleUser, Icon, LogOut, Settings, Timer, UserLock } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import supabase from "@/utils/supabase";
import { useToast } from "@/contexts/ToastContext";

function NavButtons() {
  const navigate = useNavigate();

  const auth = useAuth();
  const toast = useToast();

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={Settings} size={25} onClick={() => navigate("/timer/settings")} />
      <IconButton icon={ChartLine} size={25} onClick={() => navigate("/stats")} />
      {auth ?
        <IconButton
          icon={LogOut}
          size={25}
          onClick={async () => {
            await supabase.auth.signOut();
            toast.success("Signed out!")
          }}
        /> :
        <IconButton icon={CircleUser} size={25} onClick={() => {
          navigate("/login");
        }} />

      }
    </div>
  );
}

export default NavButtons;
