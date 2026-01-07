import { useEffect, useRef, useState } from "react";
import "./CustomDropdown.css"
import Divider from "./Divider";

type DropdownOption = {
  value: string;
  label: string;
}

export function CustomDropdown({ options, value, onClick, onRightClick }:
  { options: DropdownOption[], value?: string, onClick: (value: string) => void , onRightClick?: (value: string) => void}) {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!options) return;

  return (
    <>
      <div ref={dropdownRef} className="dropdown-container">
        <div className="text bold"
          onClick={() => setOpen(o => !o)}
        >
          {value ?? "NO SESSION"}
          <span className={`arrow ${open ? "arrow-flipped" : ""}`}>
            &#9662;
          </span>
        </div>
        {open && (
          <div className="popout-container dropdown">
            {options.map((option, i) => {
              if(option.value === "/divider/" && option.label === "/divider/") {
                return <Divider key={"divider"+i}/>
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
                    if(onRightClick) {
                      setOpen(false);
                      onRightClick(option.value);
                    }
                  }}

                >
                  <div>
                    {option.label}
                  </div>
                </div>
              )}
            )}
          </div>
        )}
      </div>

    </>
  );
}
