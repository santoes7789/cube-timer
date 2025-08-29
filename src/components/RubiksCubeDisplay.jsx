import { DisplayCube, applyScramble, Cube } from 'react-rubiks-cube-utils';

const RubiksCubeDisplay = ({ scramble }) => {
	console.log("scramble" + scramble);
	const myCube = applyScramble({ type: '3x3', scramble: scramble });
	return (

		<DisplayCube cube={myCube} size={8} />
	);
}

export default RubiksCubeDisplay
