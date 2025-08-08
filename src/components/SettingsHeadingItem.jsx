import { ListGroup } from "react-bootstrap";
const SettingsHeadingItem = ({ children }) => {
	return (
		<ListGroup.Item className="d-flex justify-content-center align-items-center">
			<strong>
				{children}
			</strong>
		</ListGroup.Item>
	)
}

export default SettingsHeadingItem;
