import "./Divider.css"

type divderTypes = "normal" | "thick";
type dividerOrientation = "horizontal" | "vertical";

// Simple "line" for aesthetic purposes. Has several options
function Divider({ type="normal", orientation="horizontal", margin="0px" } : { type?: divderTypes, orientation?: dividerOrientation, margin?: string}) {
  return <div className={`divider ${type} ${orientation}`} style={{ margin: `${margin} 0px`}}/>
}

export default Divider;
