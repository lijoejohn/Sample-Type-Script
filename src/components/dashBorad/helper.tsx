import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Col, Row, Button } from "react-bootstrap";
import { ProgressBar, Icon, Flag } from "../sharedComponents/common";
import AppToolTip from "../sharedComponents/tooltip";
import { logout } from "../../utils/helper";
import { random } from "lodash";

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

export const LanguageInfo = ({
	language,
	index = 0,
	expanded = true,
	confirmDelete,
}: InferProps<typeof LanguageInfo.propTypes>): JSX.Element => {
	return (
		<Col key={index} className="card-item" lg="4" sm="4" md="4" xs="4">
			<Flag flag={language.flag} />
			<span className="sub-heading language-name hand">{language.languageName}</span>
			<AppToolTip
				component={
					<span onClick={() => confirmDelete(language.languageKey)} className="remove-language label hand">
						Remove
					</span>
				}
				message="Remove"
			/>

			<ProgressBar donePercent={language.donePercent} />
			<Row className={`justify-content-md-center mt-4 ${expanded ? "show" : "hide"}`}>
				<Info label={"Done"} value={`${language.donePercent}%`} breakPoint={4} />
				<Info label={"WORDS TO DO"} className="color-blue" value={language.wordsToDo} breakPoint={4} />
				<Info label={"UNVERIFIED"} className="color-blue" value={language.unverified} breakPoint={4} />
			</Row>
		</Col>
	);
};
LanguageInfo.propTypes = {
	language: PropTypes.object,
	index: PropTypes.number,
	expanded: PropTypes.bool,
	confirmDelete: PropTypes.func,
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
					<span onClick={logout} className="logout label hand">
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
