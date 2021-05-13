import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../components/login";

const Routers = (): JSX.Element => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Redirect to="/login" />
		</Switch>
	);
};

export default Routers;
