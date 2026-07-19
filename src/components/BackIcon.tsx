// @ts-ignore
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";

import "./BackIcon.css";
import { useNavigate } from "react-router-dom";

export function BackIcon({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="top-left">
      <ArrowLeft className="backIcon" onClick={() => {
        if (!onClick) {
          navigate(-1);
        } else {
          onClick();
        }
      }} />
    </div>
  );
}
