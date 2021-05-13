import React, { useState } from "react";

import { FormGroup, Button, Row, Col, Container } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

import Loader from "../../utils/loader";
import { loginFunction } from "../../utils/helper";
import Toaster from "../sharedComponents/toaster";
import "./login.scss";

interface Values {
	email: string;
	password: string;
}

const Login = (): JSX.Element => {
	const [showLoader, setLoader] = useState(false);
	const [showToaster, setShowToaster] = useState<boolean>(false);

	const loginAction = (values: { email: string; password: string }): void => {
		setLoader(true);
		setTimeout(() => {
			setLoader(false);
			const proceed = loginFunction(values);
			proceed ? (window.location.href = "/") : setShowToaster(true);
		}, 500);
	};
	return (
		<Container>
			<div className="container login-container">
				{showLoader ? <Loader /> : null}
				<div className="login-wrap">
					<div className="sign-in-container">
						<Row className="justify-content-md-center">
							<Col lg="8" sm="8" className="login-bg" md="auto">
								<div className="session-bg-gradient"></div>
							</Col>
							<Col lg="4" sm="4" md="auto">
								<Formik
									initialValues={{
										email: "admin@test.com",
										password: "@123456!",
									}}
									onSubmit={(values: Values) => {
										loginAction(values);
									}}>
									<Form>
										<FormGroup controlId="formBasicEmail">
											<span>Email address</span>
											<Field className="form-control" id="email" name="email" placeholder="Enter email" />
										</FormGroup>

										<FormGroup controlId="formBasicPassword">
											<span>Password</span>
											<Field
												className="form-control"
												type="password"
												id="password"
												name="password"
												placeholder="Password"
											/>
										</FormGroup>
										<FormGroup className="ta-center" controlId="formBasicSubmit">
											<Button type="submit">Login</Button>
										</FormGroup>
									</Form>
								</Formik>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<Toaster
				{...{ showToaster, setShowToaster, message: "Woohoo, You have entered an invalid username or password!" }}
			/>
		</Container>
	);
};
export default Login;
