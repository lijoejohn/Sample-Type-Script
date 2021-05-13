import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Toast } from "react-bootstrap";

const Toaster = ({ setShowToaster, showToaster, message }: InferProps<typeof Toaster.propTypes>): JSX.Element => {
	return (
		<div
			aria-live="polite"
			aria-atomic="true"
			style={{
				position: "relative",
				minHeight: "100px",
			}}>
			<Toast
				data-test="toaster"
				onClose={() => setShowToaster(false)}
				show={showToaster}
				delay={3000}
				style={{
					position: "fixed",
					top: 0,
					right: 0,
				}}>
				<Toast.Header closeButton={false}>
					<strong className="mr-auto">Alert</strong>
				</Toast.Header>
				<Toast.Body>{message}</Toast.Body>
			</Toast>
		</div>
	);
};
Toaster.propTypes = {
	setShowToaster: PropTypes.func,
	showToaster: PropTypes.bool,
	message: PropTypes.string,
};

export default Toaster;
