import type { MouseEvent, ReactNode } from "react";
import "./Popup.css"

function Popup({children, show, onClose} : {children?: ReactNode, show: boolean, onClose: () => void}) {
  const handleChildClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
