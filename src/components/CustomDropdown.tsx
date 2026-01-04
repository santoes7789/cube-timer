import { useEffect, useRef, useState } from "react";
import "./CustomDropdown.css"

type DropdownOption = {
  value: string;
  label: string;
}

export function CustomDropdown({ options, value, onClick }: {options: DropdownOption[], value: string | null, onClick: (value: string) => void}) {
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

  if(!options) return;

  return (
    <>
      <div ref={dropdownRef} className="dropdown-container">
        <div className="text bold" onClick={() => setOpen(o => !o)}>
          {value ?? "Select an option"} 
          <span className={`arrow ${open ? "arrow-flipped" : ""}`}>
            &#9662;
          </span>
        </div>
        {open && (
          <div className="popout-container dropdown">
            {options.map(option => (
              <div
                className="option"
                key={option.value}
                onClick={() => {
                  setOpen(false);
                  onClick(option.value);
                }}
              >
                <div>
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  );
}
