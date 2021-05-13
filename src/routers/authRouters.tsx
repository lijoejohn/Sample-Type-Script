import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import DashBorad from "../components/dashBorad";

const Routers = (): JSX.Element => {
	return (
		<Switch>
			<Route exact path="/home" component={DashBorad} />
			<Redirect to="/home" />
		</Switch>
	);
};

export default Routers;
