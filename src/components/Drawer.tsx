import type { ReactNode } from "react";
import "./Drawer.css";

export function Drawer({ open, onClose, children, side }: { open: boolean, onClose: () => void, children: ReactNode, side: "left" | "right" }) {
  if (!open) return;

  return (
    <div className="drawer-background" onClick={onClose}>
      <div className={`drawer-popup ${side === "left" ? "drawer-left" : 'drawer-right'}`}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}