import { DisplayCube, applyScramble } from 'react-rubiks-cube-utils';

export default function RubiksCubeDisplay ({ scramble } : {scramble: string})  {
  const myCube = applyScramble({ type: '3x3', scramble: scramble });
  return (
    <div className="rubiks-display popout-container">
      <DisplayCube cube={myCube} size={8} />
    </div>
  );
}

