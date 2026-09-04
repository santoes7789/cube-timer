import { DisplayCube, applyScramble } from 'react-rubiks-cube-utils';

// Function for rubiks cube display. Utilizes react-rubiks-cube-utils component
export default function RubiksCubeDisplay ({ scramble } : {scramble: string})  {
  const myCube = applyScramble({ type: '3x3', scramble: scramble });
  return (
    <div className="rubiks-display popout-container top-left">
      <DisplayCube cube={myCube} size={8} />
    </div>
  );
}
