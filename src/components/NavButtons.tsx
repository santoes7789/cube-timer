import {CircleUser, Settings, Timer } from "lucide-react";
import "./NavButtons.css"
import { IconButton } from "./IconButton";
import { useNavigate } from "react-router-dom";

function NavButtons() {
  const navigate = useNavigate();

  return (
    <div className="popout-container nav-buttons top-right">
      <IconButton icon={CircleUser} size={25} onClick={() => navigate("/login")}/>
      <IconButton icon={Settings} size={25} onClick={() => {}}/>
      <IconButton icon={Timer} size={25} onClick={() => navigate("/timer")}/>
    </div>
  )
}

export default NavButtons;
