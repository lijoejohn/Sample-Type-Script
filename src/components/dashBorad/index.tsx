import React, { useState, useEffect, useCallback } from "react";

import { Container, Row, Col, Button, FormGroup, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { sample, some, random } from "lodash";

import Loader from "../../utils/loader";
import "./dashBoard.scss";

import { availableLanguages, availableProjects } from "../../data/mockData";

import { getLsValue, setLsValue } from "../../utils/helper";
import { colors, schemaMapper, globalLanguagesSet } from "../../constants/common";

import Toaster from "../sharedComponents/toaster";
import AppModal from "../sharedComponents/modal";
import AppToolTip from "../sharedComponents/tooltip";
import Header from "./header";

const DashBoard = (): JSX.Element => {
	const [showLoader, setLoader] = useState<boolean>(false);
	const [expanded, setExpanded] = useState<boolean>(true);
	const [addMode, setAddMode] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	const [showToaster, setShowToaster] = useState<boolean>(false);

	const [activeRecord, setActiveRecord] = useState<string>("");
	const [projectLanguages, setProjectLanguages] = useState<
		Array<{
			languageName: string;
			projectKey: string;
			donePercent: number;
			flag: string;
			wordsToDo: number;
			unverified: number;
			languageKey: string;
		}>
	>([]);
	const [multiSelections, setMultiSelections] = useState<
		Array<{
			languageKey: string;
			languageName: string;
			flag: string;
		}>
	>([]);

	const [globalLanguages, setGlobalLanguages] =
		useState<
			Array<{
				languageKey: string;
				languageName: string;
				flag: string;
			}>
		>(globalLanguagesSet);

	const confirmDelete = (key: string): void => {
		setActiveRecord(key);
		setShowConfirm(true);
	};
	const getAppData = useCallback((): void => {
		setProjectLanguages(JSON.parse(getLsValue(schemaMapper.projectLanguages)));
		setLoader(false);
	}, []);

	const initAppData = useCallback((): void => {
		setProjectLanguages(availableLanguages);
		setLsValue(schemaMapper.projectLanguages, JSON.stringify(availableLanguages));
		setLoader(false);
	}, []);

	useEffect(() => {
		setLoader(true);
		getLsValue(schemaMapper.projectLanguages) ? getAppData() : initAppData();
	}, [getAppData, initAppData]);

	const handleClose = () => {
		setAddMode(false);
	};
	const handleAddPopUp = (projectKey) => {
		setMultiSelections([]);
		const existingLanguages = projectLanguages.filter((language) => language.projectKey === projectKey);
		const languageOptions = globalLanguagesSet.filter(
			(language) => !some(existingLanguages, ["languageKey", language.languageKey])
		);
		setGlobalLanguages(languageOptions);
		setAddMode(true);
		setActiveRecord(projectKey);
	};
	const handleConfirmClose = () => {
		setShowConfirm(false);
	};

	const doDeleteAction = (): void => {
		const updatedDataSet = projectLanguages.filter((language) => language.languageKey !== activeRecord);
		setProjectLanguages(updatedDataSet);
		setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
		handleConfirmClose();
	};
	const getLanguageObject = (language: {
		languageKey: string;
		languageName: string;
		flag: string;
	}): {
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

	const doAddAction = (): void => {
		if (multiSelections.length) {
			const newLanguageSet = multiSelections.map(getLanguageObject);
			const updatedDataSet = [...projectLanguages, ...newLanguageSet];
			setProjectLanguages(updatedDataSet);
			setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
			handleClose();
		} else {
			setShowToaster(true);
		}
	};

	return (
		<Container>
			<div className="container">
				<div className="app-wrap">
					{showLoader ? <Loader /> : null}
					<Row className="justify-content-md-center">
						<Col lg="1" xs="12" sm="1" className="left-padding" md="auto" />
						<Col lg="11" sm="11" md="11" xs="12">
							<Row className="justify-content-md-center mt-3">
								<Col lg="12" sm="12" md="12" xs="12">
									<Header {...{ setExpanded, expanded }} />
								</Col>
							</Row>
							{availableProjects.map((project, index) => (
								<Row key={index} className="justify-content-md-center left-bar-wrap mt-4">
									<Col className="left-bar" lg="3" sm="3" md="3" xs="12">
										<div className="heading hand">{project.projectName}</div>

										<div className="w3-light-grey w3-round mt-2">
											<div
												className={`w3-container w3-round w3-${sample(colors)}`}
												style={{ width: `${project.donePercent}%` }}></div>
										</div>
										<Row className="justify-content-md-center mt-4">
											<Col lg="6" sm="6" md="6" xs="6">
												<span className="label">Done</span>
												<span className="label label-medium">{project.donePercent}%</span>
											</Col>
											<Col lg="6" sm="6" md="6" xs="6">
												<span className="label">BASE WORDS</span>
												<span className="label label-medium">{project.baseWords}</span>
											</Col>
										</Row>
										<Row className="justify-content-md-center mt-4">
											<Col lg="6" sm="6" md="6" xs="6">
												<span className="label">TEAM</span>
												<span className="label label-medium color-blue">{project.team}</span>
											</Col>
											<Col lg="6" sm="6" md="6" xs="6">
												<span className="label">KEYS</span>
												<span className="label label-medium">{project.keys}</span>
											</Col>
										</Row>
										<Row className="justify-content-md-left mt-4">
											<Col lg="6" sm="6" md="6" xs="6">
												<span className="label">QA ISSUES</span>
												<span className="label label-medium color-blue">{project.qaIssues}</span>
											</Col>
										</Row>
										<Row className="justify-content-md-left mt-4">
											<Col lg="12" sm="12" md="12" xs="12">
												<AppToolTip
													component={
														<span className="icon green ">
															<span className="up-arrow"></span>
														</span>
													}
													message="Upload"
												/>

												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Download</Tooltip>}>
													<span className="icon red ">
														<span className="down-arrow"></span>
													</span>
												</OverlayTrigger>

												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Tasks</Tooltip>}>
													<span className="icon light-green ">
														<span className="tick"></span>
													</span>
												</OverlayTrigger>

												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Activity</Tooltip>}>
													<span className="icon gray ">
														<span className="graph"></span>
													</span>
												</OverlayTrigger>
											</Col>
											<Col lg="12" sm="12" md="12" xs="12">
												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Download</Tooltip>}>
													<span className="icon red ">
														<span className="down-arrow"></span>
													</span>
												</OverlayTrigger>

												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Tasks</Tooltip>}>
													<span className="icon light-green ">
														<span className="tick"></span>
													</span>
												</OverlayTrigger>

												<OverlayTrigger
													placement="top"
													overlay={<Tooltip id="button-tooltip">Activity</Tooltip>}>
													<span className="icon gray ">
														<span className="graph"></span>
													</span>
												</OverlayTrigger>
											</Col>
											<Col className="mt-3" lg="12" sm="12" md="12" xs="12">
												<Button className="btn btn-lg btn-badge bg-orange">Roamer</Button>
												<Button className="btn btn-lg btn-badge bg-green">iOS</Button>
											</Col>
										</Row>
									</Col>

									<Col className="right-bar" lg="9" sm="9" md="9" xs="12">
										<Row className="justify-content-md-left card-block">
											{projectLanguages
												.filter((language) => language.projectKey === project.projectKey)
												.map((language, subIndex) => (
													<Col key={subIndex} className="card-item" lg="4" sm="4" md="4" xs="4">
														<span className="flag-box">
															<img src={`/flags/${language.flag}`} alt="Exchange-icon" />
														</span>
														<span className="sub-heading language-name hand">
															{language.languageName}
														</span>

														<OverlayTrigger
															placement="top"
															overlay={<Tooltip id="button-tooltip">Remove Language</Tooltip>}>
															<span
																onClick={() => confirmDelete(language.languageKey)}
																className="remove-language label hand">
																Remove
															</span>
														</OverlayTrigger>
														<div className="w3-light-grey w3-round mt-2">
															<div
																className={`w3-container w3-round w3-${sample(colors)}`}
																style={{ width: `${language.donePercent}%` }}></div>
														</div>
														<Row
															className={`justify-content-md-center mt-4 ${
																expanded ? "show" : "hide"
															}`}>
															<Col lg="4" sm="4" md="4" xs="4">
																<span className="label">Done</span>
																<span className="label label-medium">
																	{language.donePercent}
																</span>
															</Col>
															<Col lg="4" sm="4" md="4" xs="4">
																<span className="label">WORDS TO DO</span>
																<span className="label label-medium color-blue">
																	{language.wordsToDo}
																</span>
															</Col>
															<Col lg="4" sm="4" md="4" xs="4">
																<span className="label">UNVERIFIED</span>
																<span className="label label-medium color-blue">
																	{language.unverified}
																</span>
															</Col>
														</Row>
													</Col>
												))}

											<Col className="card-item" lg="4" sm="4" md="4" xs="4">
												<Button
													onClick={() => {
														handleAddPopUp(project.projectKey);
													}}
													className="btn btn-lg btn-secondary">
													Add Language
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							))}
						</Col>
					</Row>
				</div>
			</div>

			{addMode && (
				<AppModal
					{...{
						onHide: handleClose,
						show: addMode,
						title: "Add languages",
						component: (
							<Form>
								<FormGroup controlId="browserInput">
									<Typeahead
										className=""
										id="basic-typeahead-multiple"
										labelKey="languageName"
										multiple={true}
										options={globalLanguages}
										placeholder="Choose Languages..."
										selected={multiSelections || []}
										onChange={(e) => {
											setMultiSelections(e);
										}}
									/>
								</FormGroup>
							</Form>
						),
						secondaryAction: handleClose,
						primaryAction: doAddAction,
					}}
				/>
			)}

			{showConfirm && (
				<AppModal
					{...{
						onHide: handleConfirmClose,
						show: showConfirm,
						title: "Confirm Delete",
						message: "Are you sure to delete?",
						secondaryAction: handleConfirmClose,
						primaryAction: doDeleteAction,
					}}
				/>
			)}

			<Toaster {...{ showToaster, setShowToaster, message: "Woohoo, Please Select Atleast One Language!" }} />
		</Container>
	);
};
export default DashBoard;
