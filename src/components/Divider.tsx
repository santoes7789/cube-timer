import "./Divider.css"

type divderTypes = "normal" | "thick";
type dividerOrientation = "horizontal" | "vertical";
function Divider({ type="normal", orientation="horizontal", margin="0px" } : { type?: divderTypes, orientation?: dividerOrientation, margin?: string}) {
  return <div className={`divider ${type} ${orientation}`} style={{ margin: `${margin} 0px`}}/>
}

export default Divider;
