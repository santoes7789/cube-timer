// @ts-ignore
import ArrowLeft from "@/assets/icons/arrow-left.svg?react";

import "./BackIcon.css"

export function BackIcon({ onClick }: { onClick: () => void }) {
  return <ArrowLeft className="backIcon" onClick={onClick} size />
}