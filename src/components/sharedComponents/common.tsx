import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { sample } from "lodash";
import { colors } from "../../constants/common";
import AppToolTip from "./tooltip";

export const ProgressBar = ({ donePercent = 0 }: InferProps<typeof ProgressBar.propTypes>): JSX.Element => {
	return (
		<div className="w3-light-grey w3-round mt-2">
			<div className={`w3-container w3-round w3-${sample(colors)}`} style={{ width: `${donePercent}%` }}></div>
		</div>
	);
};
ProgressBar.propTypes = {
	donePercent: PropTypes.number,
};

export const Icon = ({ tooltip = "", color = "", icon = "" }: InferProps<typeof Icon.propTypes>): JSX.Element => {
	return (
		<AppToolTip
			component={
				<span className={`icon ${color}`}>
					<span className={icon}></span>
				</span>
			}
			message={tooltip}
		/>
	);
};
Icon.propTypes = {
	tooltip: PropTypes.string,
	color: PropTypes.string,
	icon: PropTypes.string,
};

export const Flag = ({ flag = "" }: InferProps<typeof Flag.propTypes>): JSX.Element => {
	return (
		<span className="flag-box">
			<img src={`/flags/${flag}`} alt="Exchange-icon" />
		</span>
	);
};
Flag.propTypes = {
	flag: PropTypes.string,
};
