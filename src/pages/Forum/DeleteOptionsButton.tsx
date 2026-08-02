import { IconButton } from "@/components/IconButton";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function DeleteOptionsButton({ onDelete }: { onDelete: () => void}) {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden" onMouseLeave={() => setShow(false)}>
      <IconButton icon={EllipsisVertical} size={22} onClick={() => setShow(prev => !prev)} />
      {show &&
        <div ref={dropdownRef} style={{ position: "absolute", padding: 0 }}>
          <button className="button-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      }
    </div>
  )
}
