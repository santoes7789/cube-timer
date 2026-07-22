import "./Divider.css"

type divderTypes = "normal" | "thick";
type dividerOrientation = "horizontal" | "vertical";
function Divider({ type="normal", orientation="horizontal" } : { type?: divderTypes, orientation?: dividerOrientation}) {
  return <div className={`divider ${type} ${orientation}`}/>
}

export default Divider;
