import "./Divider.css"

type divderTypes = "normal" | "thick";
function Divider({ type="normal" } : { type?: divderTypes}) {
  return <div className={`divider ${type}`}/>
}

export default Divider;
