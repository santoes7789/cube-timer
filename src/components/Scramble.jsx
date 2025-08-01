import { randomScrambleForEvent } from "cubing/scramble";

export const generateNewScramble = (setScramble) => {
	randomScrambleForEvent("333").then(s => setScramble(s.toString()))
}

const Scramble = ({ scramble }) => {
	return (
		<div className="container scramble">
			<h2>{scramble}</h2>
		</div>
	)
}

export default Scramble;
