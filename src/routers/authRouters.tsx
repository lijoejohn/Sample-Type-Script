import React from "react";
import DashBorad from "../components/dashBorad";
import { Switch, Route, Redirect } from "react-router-dom";

const Routers = (): JSX.Element => {
	return <Switch>
		<Route exact path="/" component={DashBorad} />
		<Redirect to="/" />
	</Switch>
};

export default Routers;
