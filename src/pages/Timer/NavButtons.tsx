import { ChartLine, CircleUser, Settings  } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { useNavigate } from "react-router-dom";

// Nav buttons for the timer page
function NavButtons() {
  const navigate = useNavigate();

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={Settings} size={30} onClick={() => navigate("/timer/settings")}/>
      <IconButton icon={CircleUser} size={30} onClick={() => { navigate("/login")}}/>
      <IconButton icon={ChartLine} size={30} onClick={() => navigate("stats")} />
    </div>
  );
}

export default NavButtons;
