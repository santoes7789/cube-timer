const Scramble = ({ scramble }) => {
	return (
		<div className="position-fixed top-0 start-0 end-0 my-4">
			<div className="border-top border-primary-subtle py-3 px-4">
				<h3>{scramble}</h3>
			</div>
		</div>
	)
}

export default Scramble;
