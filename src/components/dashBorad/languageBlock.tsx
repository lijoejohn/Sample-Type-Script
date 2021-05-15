import React, { useState } from "react";
import PropTypes, { InferProps } from "prop-types";
import { Col, Row, Button, FormGroup, Form } from "react-bootstrap";
import { some } from "lodash";
import { Typeahead } from "react-bootstrap-typeahead";

import { ProgressBar, Flag } from "../sharedComponents/common";
import { schemaMapper, globalLanguagesSet } from "../../constants/common";

import Toaster from "../sharedComponents/toaster";
import AppModal from "../sharedComponents/modal";

import { getLanguageObject, Info } from "./helper";
import { setLsValue } from "../../utils/helper";

const LanguageInfo = ({
	expanded = true,
	projectKey = "",
	projectLanguages = [],
	reloadData,
	setReloadData,
}: InferProps<typeof LanguageInfo.propTypes>): JSX.Element => {
	/**
	 * Add language modal popup state
	 */
	const [addMode, setAddMode] = useState<boolean>(false);
	/**
	 *
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

	const handleDeleteConfirmClose = (): void => {
		setShowConfirm(false);
	};

	const doDeleteAction = (): void => {
		//create new data set
		const updatedDataSet = projectLanguages.filter((language) => language.languageKey !== activeRecord);
		//set localstorage
		setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
		handleDeleteConfirmClose();
		//set state
		setReloadData(!reloadData);
	};

	const doAddAction = (): void => {
		if (multiSelections.length) {
			//create new data set for push to list
			const newLanguageSet = multiSelections.map((language) => {
				return getLanguageObject(language, activeRecord);
			});
			const updatedDataSet = [...projectLanguages, ...newLanguageSet];

			//set localstorage
			setLsValue(schemaMapper.projectLanguages, JSON.stringify(updatedDataSet));
			handleClose();
			//set state
			setReloadData(!reloadData);
		} else {
			setShowToaster(true);
		}
	};

	return (
		<>
			{projectLanguages
				.filter((language) => language.projectKey === projectKey)
				.map((language, subIndex) => (
					<Col key={subIndex} className="card-item" lg="4" sm="4" md="4" xs="4">
						<Flag flag={language.flag} />
						<span className="sub-heading language-name hand">{language.languageName}</span>
						<span
							data-test="remove-language"
							onClick={() => confirmDelete(language.languageKey)}
							className={`remove-language label hand ${showConfirm ? "disabled" : ""}`}>
							Remove
						</span>
						<ProgressBar donePercent={language.donePercent} />
						<Row className={`justify-content-md-center mt-4 ${expanded ? "show" : "hide"}`}>
							<Info label={"Done"} value={`${language.donePercent}%`} breakPoint={4} />
							<Info label={"WORDS TO DO"} className="color-blue" value={language.wordsToDo} breakPoint={4} />
							<Info label={"UNVERIFIED"} className="color-blue" value={language.unverified} breakPoint={4} />
						</Row>
					</Col>
				))}
			<Col className="card-item" lg="4" sm="4" md="4" xs="4">
				<Button
					disabled={addMode || showConfirm}
					data-test="add-language"
					onClick={() => {
						showAddPopUp(projectKey);
					}}
					className="btn btn-lg btn-secondary">
					Add Language
				</Button>
			</Col>
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
		</>
	);
};
LanguageInfo.propTypes = {
	language: PropTypes.object,
	index: PropTypes.number,
	expanded: PropTypes.bool,
	confirmDelete: PropTypes.func,
	showConfirm: PropTypes.bool,
	project: PropTypes.string,
	projectLanguages: PropTypes.array,
	reloadData: PropTypes.bool,
	setReloadData: PropTypes.func,
};
export default LanguageInfo;
