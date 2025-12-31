import { generateScramble } from "react-rubiks-cube-utils";

export function generateNewScramble() {
  return generateScramble({type: "3x3"});
}

export default function Scramble({scramble} : {scramble: string}) {
  return (
    <div className="scramble popout-container">
      {scramble}
    </div>
  )
}


