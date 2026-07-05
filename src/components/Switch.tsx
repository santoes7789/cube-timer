import type { ChangeEvent } from "react";
import "./Switch.css";

export default function Switch({ isChecked, handleToggle } : { isChecked: boolean, handleToggle: (event: ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <label className="switch-container">
      <div className="switch-wrapper">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={handleToggle} 
          className="switch-input"
        />
        <span className="switch-slider" />
      </div>
    </label>
  );
}