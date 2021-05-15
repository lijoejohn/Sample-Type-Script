import React, { useState, useEffect, useCallback } from "react";

import { Container, Row, Col } from "react-bootstrap";

import { availableLanguages, availableProjects } from "../../data/mockData";
import { getLsValue, setLsValue } from "../../utils/helper";
import { schemaMapper } from "../../constants/common";

import Loader from "../sharedComponents/loader";

import LanguageInfo from "./languageBlock";

import { ProjectInfo, Header } from "./helper";

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
	 * Language info expand/collaps state
	 */
	const [reloadData, setReloadData] = useState<boolean>(true);

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
	}, [getAppData, initAppData, reloadData]);

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
											<LanguageInfo
												{...{
													expanded,
													projectKey: project.projectKey,
													projectLanguages,
													reloadData,
													setReloadData,
												}}
											/>
										</Row>
									</Col>
								</Row>
							))}
						</Col>
					</Row>
				</div>
			</div>
		</Container>
	);
};
export default DashBoard;
