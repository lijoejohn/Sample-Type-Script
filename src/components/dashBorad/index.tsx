import React, { useState, useEffect, useCallback } from "react";
import { some } from "lodash";

import { Container, Row, Col, Button, FormGroup, Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

import { availableLanguages, availableProjects } from "../../data/mockData";
import { getLsValue, setLsValue } from "../../utils/helper";
import { schemaMapper, globalLanguagesSet } from "../../constants/common";

import Loader from "../sharedComponents/loader";
import Toaster from "../sharedComponents/toaster";
import AppModal from "../sharedComponents/modal";

import { ProjectInfo, LanguageInfo, Header, getLanguageObject } from "./helper";

import "./dashBoard.scss";
const DashBoard = (): JSX.Element => {
	/**
	 * Loader display state
	 */
	const [showLoader, setLoader] = useState<boolean>(false);
	/**
	 * Language info expand/collaps state
	 */
	const [expanded, setExpanded] = useState<boolean>(true);
	/**
	 * Add language modal popup state
	 */
	const [addMode, setAddMode] = useState<boolean>(false);
	/**
	 * Delete confirmation modal popup state
	 */
	const [showConfirm, setShowConfirm] = useState<boolean>(false);
	/**
	 * Validation toaster display state
	 */
	const [showToaster, setShowToaster] = useState<boolean>(false);
	/**
	 * Active record - for language add it will be the parrent project ID , in the case of delete language it will be the language ID
	 */
	const [activeRecord, setActiveRecord] = useState<string>("");
	/**
	 * Languages under the client for all the projects
	 */
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
	/**
	 * Languages selecetd for adding from popup
	 */
	const [multiSelections, setMultiSelections] = useState<
		Array<{
			languageKey: string;
			languageName: string;
			flag: string;
		}>
	>([]);
	/**
	 * Global language list
	 */
	const [globalLanguages, setGlobalLanguages] =
		useState<
			Array<{
				languageKey: string;
				languageName: string;
				flag: string;
			}>
		>(globalLanguagesSet);
	/**
	 * Function to fetch all data from local storage and set to state
	 */
	const getAppData = useCallback((): void => {
		setProjectLanguages(JSON.parse(getLsValue(schemaMapper.projectLanguages)));
		setLoader(false);
	}, []);
	/**
	 * Function to fetch all data from mock data file and store it in storage then set to state
	 */
	const initAppData = useCallback((): void => {
		setProjectLanguages(availableLanguages);
		setLsValue(schemaMapper.projectLanguages, JSON.stringify(availableLanguages));
		setLoader(false);
	}, []);

	useEffect(() => {
		setLoader(true);
		getLsValue(schemaMapper.projectLanguages) ? getAppData() : initAppData();
	}, [getAppData, initAppData]);
	/**
	 * Delete button click
	 */
	const confirmDelete = (key: string): void => {
		setActiveRecord(key);
		setShowConfirm(true);
	};

	const handleClose = (): void => {
		setAddMode(false);
	};

	const showAddPopUp = (projectKey: string): void => {
		//Reset all previously selecetd values
		setMultiSelections([]);
		//Filter the existing langugaes for the project
		const existingLanguages = projectLanguages.filter((language) => language.projectKey === projectKey);
		//Bypass the existing languages from he global list
		const languageOptions = globalLanguagesSet.filter(
			(language) => !some(existingLanguages, ["languageKey", language.languageKey])
		);
		//Set dropdown items
		setGlobalLanguages(languageOptions);
		setAddMode(true);
		setActiveRecord(projectKey);
	};

	const handleDeleteConfirmClose = (): void => {
		setShowConfirm(false);
	};

	const doDeleteAction = (): void => {
		//create new data set
		const updatedDataSet = projectLanguages.filter((language) => language.languageKey !== activeRecord);
		//set state
		setProjectLanguages(updatedDataSet);
		//set localstorage
		setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
		handleDeleteConfirmClose();
	};

	const doAddAction = (): void => {
		if (multiSelections.length) {
			//create new data set for push to list
			const newLanguageSet = multiSelections.map((language) => {
				return getLanguageObject(language, activeRecord);
			});
			const updatedDataSet = [...projectLanguages, ...newLanguageSet];
			//set state
			setProjectLanguages(updatedDataSet);
			//set localstorage
			setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
			handleClose();
		} else {
			setShowToaster(true);
		}
	};

	return (
		<Container>
			<div data-test="dashboard-wrap" className="container">
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
									<ProjectInfo {...{ project }} />
									<Col className="right-bar" lg="9" sm="9" md="9" xs="12">
										<Row className="justify-content-md-left card-block">
											{projectLanguages
												.filter((language) => language.projectKey === project.projectKey)
												.map((language, subIndex) => (
													<LanguageInfo
														key={subIndex}
														{...{ language, index: subIndex, expanded, confirmDelete, showConfirm }}
													/>
												))}
											<Col className="card-item" lg="4" sm="4" md="4" xs="4">
												<Button
													disabled={addMode}
													data-test="add-language"
													onClick={() => {
														showAddPopUp(project.projectKey);
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
							<Form data-test="add-form">
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
						onHide: handleDeleteConfirmClose,
						show: showConfirm,
						title: "Confirm Delete",
						message: "Are you sure to delete?",
						secondaryAction: handleDeleteConfirmClose,
						primaryAction: doDeleteAction,
					}}
				/>
			)}
			<Toaster {...{ showToaster, setShowToaster, message: "Woohoo, Please Select Atleast One Language!" }} />
		</Container>
	);
};
export default DashBoard;
