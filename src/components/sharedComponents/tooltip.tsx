import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const AppToolTip = ({ component, message }: InferProps<typeof AppToolTip.propTypes>): JSX.Element => {
	return (
		<OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip">{message}</Tooltip>}>
			{component}
		</OverlayTrigger>
	);
};
AppToolTip.propTypes = {
	component: PropTypes.element,
	message: PropTypes.string,
};

export default AppToolTip;
