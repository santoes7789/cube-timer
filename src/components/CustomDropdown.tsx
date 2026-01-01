import { useState } from "react";
import "./CustomDropdown.css"
type DropdownOption = {
  value: string;
  label: string;
}
export function CustomDropdown({ options }: {options: DropdownOption[]}) {
  if(!options) return;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <>
      <div className="trigger" onClick={() => setOpen(o => !o)}>
        {value ?? "Select an option"}
      </div>

      {open && (
        <div className="dropdown">
          <ul>
            {options.map(option => (
              <li
                className="option"
                key={option.value}
                onClick={() => {
                  setValue(option.value);
                  setOpen(false);
                }}
                
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
