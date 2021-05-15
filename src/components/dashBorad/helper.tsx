import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { random } from "lodash";

import { ProgressBar, Icon } from "../sharedComponents/common";
import AppToolTip from "../sharedComponents/tooltip";
import { setLsValue } from "../../utils/helper";

const LSVariable: string = process.env.REACT_APP_LS_VAR || "";

export const Info = ({
	label = "",
	value = 0,
	className = "",
	breakPoint = 6,
}: InferProps<typeof Info.propTypes>): JSX.Element => {
	return (
		<Col lg={breakPoint} sm={breakPoint} md={breakPoint} xs={breakPoint}>
			<span className="label">{label}</span>
			<span className={`label label-medium ${className}`}>{value}</span>
		</Col>
	);
};
Info.propTypes = {
	label: PropTypes.string,
	value: PropTypes.any,
	className: PropTypes.string,
	breakPoint: PropTypes.number,
};

export const ProjectInfo = ({ project }: InferProps<typeof ProjectInfo.propTypes>): JSX.Element => {
	return (
		<Col className="left-bar" lg="3" sm="3" md="3" xs="12">
			<div className="heading hand">{project.projectName}</div>
			<ProgressBar donePercent={project.donePercent} />
			<Row className="justify-content-md-center mt-4">
				<Info label={"Done"} value={`${project.donePercent}%`} />
				<Info label={"BASE WORDS"} value={project.baseWords} />
			</Row>
			<Row className="justify-content-md-center mt-4">
				<Info label={"TEAM"} value={project.team} className="color-blue" />
				<Info label={"KEYS"} value={project.keys} />
			</Row>
			<Row className="justify-content-md-left mt-4">
				<Info label={"QA ISSUES"} value={project.qaIssues} className="color-blue" />
			</Row>
			<Row className="justify-content-md-left mt-4">
				<Col lg="12" sm="12" md="12" xs="12">
					<Icon tooltip="Upload" color="green" icon="up-arrow" />
					<Icon tooltip="Download" color="red" icon="down-arrow" />
					<Icon tooltip="Tasks" color="light-green" icon="tick" />
					<Icon tooltip="Activity" color="gray" icon="graph" />
				</Col>
				<Col lg="12" sm="12" md="12" xs="12">
					<Icon tooltip="Download" color="red" icon="down-arrow" />
					<Icon tooltip="Tasks" color="light-green" icon="tick" />
					<Icon tooltip="Activity" color="gray" icon="graph" />
				</Col>
				<Col className="mt-3" lg="12" sm="12" md="12" xs="12">
					<Button className="btn btn-lg btn-badge bg-orange">Roamer</Button>
					<Button className="btn btn-lg btn-badge bg-green">iOS</Button>
				</Col>
			</Row>
		</Col>
	);
};
ProjectInfo.propTypes = {
	project: PropTypes.object,
};

export const Header = ({ setExpanded, expanded }: InferProps<typeof Header.propTypes>): JSX.Element => {
	const onLogout = () => {
		setLsValue(LSVariable, "");
		window.location.reload();
	};
	return (
		<>
			<Button className="btn btn-lg btn-primary">
				New Project<span className="p-2">⇧⌘P</span>
			</Button>
			<AppToolTip
				component={
					<Button
						onClick={() => {
							setExpanded(!expanded);
						}}
						className="btn btn-lg btn-secondary">
						{expanded ? "Collaps" : "Expand"} All
					</Button>
				}
				message={`${expanded ? "Collaps" : "Expand"} Language Deatils`}
			/>
			<AppToolTip
				component={
					<span data-test="logout" onClick={onLogout} className="logout label hand">
						Logout
					</span>
				}
				message="Logout From The Application"
			/>
		</>
	);
};
Header.propTypes = {
	setExpanded: PropTypes.func,
	expanded: PropTypes.bool,
};

export const getLanguageObject = (
	language: {
		languageKey: string;
		languageName: string;
		flag: string;
	},
	activeRecord: string
): {
	projectKey: string;
	languageKey: string;
	languageName: string;
	flag: string;
	donePercent: number;
	wordsToDo: number;
	unverified: number;
} => {
	return {
		...language,
		projectKey: activeRecord,
		donePercent: random(1, 99),
		wordsToDo: random(1, 99999),
		unverified: random(1, 9999),
	};
};
