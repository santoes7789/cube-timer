import type { ChangeEvent } from "react"
import "./ColorPicker.css"

export function ColorPicker({ color, onColorChange} : { color: string, onColorChange: (event: ChangeEvent<HTMLInputElement>) => void}) {
  return (
    <div>
      <input type="color" className="color-picker" value={color} onChange={onColorChange} />
    </div>
  )
}