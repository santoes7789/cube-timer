import { type LucideIcon } from 'lucide-react';
import "./IconButton.css"

interface IconButtonProps {
  icon: LucideIcon;
  label?: string;
  onClick: () => void;
  size: number;
}

// Icon element that can be used as a button
export function IconButton({ icon: Icon, size, onClick }: IconButtonProps) {
  return (
    <div className="icon-button" onClick={onClick}>
      <Icon size={size} />
    </div>
  );
}
