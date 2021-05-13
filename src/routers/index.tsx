import React from "react";
import { getLsValue } from "../utils/helper";
import AuthRouters from "./authRouters";
import SessionRouters from "./sessionRouters";

const LSVariable: string = process.env.REACT_APP_LS_VAR || "";
/**
 * Render the routes based on the authentication
 */
const Routers = (): JSX.Element => {
	const getLSVariable = getLsValue(LSVariable);
	return getLSVariable ? <AuthRouters /> : <SessionRouters />;
};

export default Routers;
