import { useEffect, useRef, useState } from "react";
import "./CustomDropdown.css"
import Divider from "./Divider";

type DropdownOption = {
  value: string;
  label: string;
}

// Component for dropdown options
export function CustomDropdown({ options, value, onClick, onRightClick, below = false }:
  { options: DropdownOption[], value?: string, onClick: (value: string) => void, onRightClick?: (value: string) => void, below?: boolean }) {

  // Variables to manage dropdown state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add listeners on startup
  useEffect(() => {
    // Closes the dropdown when user clicks outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Add the listeners, and remove it when component unloads.
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If there are no options, don't render anything
  if (!options) return;

  return (
    <>
      <div ref={dropdownRef} className="dropdown-container">

        {/* Text with dropdown icon */}
        <div className="text bold" onClick={() => setOpen(o => !o)}>
          {value ?? "NO SESSION"}
          <span className={`arrow ${open ? "arrow-flipped" : ""}`}>

            {below ? "▴" : "▾"}
          </span>
        </div>



        {/* Dropdown itself */}
        {open && (
          <div className={`popout-container dropdown ${below ? "below" : ""}`}>
            {options.map((option, i) => {
              if (option.value === "/divider/" && option.label === "/divider/") {
                return <Divider key={"divider" + i} />
              }
              return (
                <div
                  className="option"
                  key={option.value}
                  onClick={() => {
                    setOpen(false);
                    onClick(option.value);
                  }}
                  onContextMenu={e => {
                    e.preventDefault();
                    if (onRightClick) {
                      setOpen(false);
                      onRightClick(option.value);
                    }
                  }}
                >
                  <div>
                    {option.label}
                  </div>
                </div>
              )
            }
            )}
          </div>
        )}
      </div>

    </>
  );
}
