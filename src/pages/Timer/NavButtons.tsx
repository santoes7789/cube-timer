import { ChartLine, CircleUser, Settings, Timer, UserLock } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function NavButtons() {
  const navigate = useNavigate();

  const auth = useAuth();

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton
        icon={CircleUser}
        size={25}
        onClick={() => {
          if (auth) {
            navigate("/profile");
          } else {
            navigate("/login");
          }
        }}
      />

      <IconButton icon={ChartLine} size={25} onClick={() => navigate("/stats")} />
      <IconButton icon={Settings} size={25} onClick={() => navigate("/timer/settings")} />
    </div>
  );
}

export default NavButtons;
