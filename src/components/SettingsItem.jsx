import { ListGroup, Form } from "react-bootstrap";
const SettingsItem = ({ text, checked, onChange }) => {
	return (
		<ListGroup.Item className="d-flex justify-content-between align-items-center">
			{text}
			<Form.Check
				type="switch"
				checked={checked}
				onChange={onChange}
			/>
		</ListGroup.Item>
	)
}

export default SettingsItem;
