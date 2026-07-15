import "./MultiButton.css"

interface MultiButtonProps {
  texts: string[];
  selected: number;
  onChange: (index: number) => void;
}

export function MultiButton({ texts, selected, onChange }: MultiButtonProps) {
  return (
    <div className="multibutton-container">
      {texts.map((e, i) => {
        let buttonType = "middle";
        if (i == 0) {
          buttonType = "left";
        } else if (i == texts.length - 1) {
          buttonType = "right";
        } if (i == selected) {
          buttonType += " selected"
        }

        return (
          <div className={`multibutton ${buttonType}`} key={i} onClick={() => onChange(i)}>{e}</div>
        );
      })}
    </div>
  )
}