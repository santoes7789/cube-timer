import { useEffect, useState } from "react";
import { ListGroup, Form } from "react-bootstrap";
export const SettingsItemSwitch = ({ children, checked, onChange }) => {
	return (
		<ListGroup.Item className="d-flex justify-content-between align-items-center">
			{children}
			<Form.Check
				type="switch"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
		</ListGroup.Item>
	)
}

export const SettingsHeadingItem = ({ children }) => {
	return (
		<ListGroup.Item className="d-flex justify-content-center align-items-center py-3">
			<h5>
				<strong>
					{children}
				</strong>
			</h5>
		</ListGroup.Item>
	)
}

export const SettingsItemInputInt = ({ children, value, onChange }) => {
	const [v, setV] = useState(value);
	const [error, setError] = useState(false);
	useEffect(() => setV(value), [value]);

	const validateChange = (e) => {
		const inputValue = e.target.value;
		setV(inputValue);
		if (inputValue > 0) {
			onChange(inputValue);
			setError(false);
		} else {
			setError(true);
		}
	}
	return (
		<ListGroup.Item className="d-flex justify-content-between align-items-center">
			{children}
			<div>
				<Form.Control
					type="number"
					style={{ width: "150px" }}
					value={v}
					isInvalid={error}
					onChange={validateChange} />

				<Form.Control.Feedback type="invalid">
					Must be an integer
				</Form.Control.Feedback>
			</div>
		</ListGroup.Item>
	)
}

export const SettingsItemColorPicker = ({ children, value, onChange }) => {
	return (
		<ListGroup.Item className="d-flex justify-content-between align-items-center">
			{children}
			<div>
				<Form.Control
					type="color"
					value={value}
					onChange={(e) => onChange(e.target.value)} />
			</div>
		</ListGroup.Item>
	)
}
