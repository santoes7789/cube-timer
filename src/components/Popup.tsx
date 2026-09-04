import type { MouseEvent, ReactNode } from "react";
import "./Popup.css";

// Popup parent element, greys out the background and closes when background is clicked
function Popup({children, show, onClose} : {children?: ReactNode, show: boolean, onClose: () => void}) {
  const handleChildClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // If popup should not be shown don't display anything
  if(!show) return;

  return (
    <div className="popup-container" onClick={onClose}>
      <div className="popup-container-child popout-container" onClick={handleChildClick}>
        {children}
      </div>
    </div>
  )
}

export default Popup;
