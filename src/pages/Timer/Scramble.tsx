import { generateScramble } from "react-rubiks-cube-utils";

// Function to generate new scramble from external package
export function generateNewScramble() {
  return generateScramble({type: "3x3"});
}

// component to display scramble
export default function Scramble({scramble} : {scramble: string}) {
  return (
    <div className="scramble popout-container">
      {scramble}
    </div>
  )
}
