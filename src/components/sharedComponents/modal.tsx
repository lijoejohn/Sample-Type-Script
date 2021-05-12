import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Modal, Button } from "react-bootstrap";
const AppModal = ({
	onHide,
	show,
	title,
	message,
	secondaryAction,
	primaryAction,
	component,
}: InferProps<typeof AppModal.propTypes>): JSX.Element => {
	return (
		<Modal onHide={onHide} show={show}>
			<Modal.Header>
				<Modal.Title className="modal-heading">{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message || component}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={secondaryAction}>
					No
				</Button>
				<Button variant="primary" onClick={primaryAction}>
					Yes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
AppModal.propTypes = {
	onHide: PropTypes.func,
	secondaryAction: PropTypes.func,
	primaryAction: PropTypes.func,
	show: PropTypes.bool,
	title: PropTypes.string,
	message: PropTypes.string,
	component: PropTypes.element,
};

export default AppModal;
