import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import "./Override.scss";

const App = (): JSX.Element => {
	return (
		<BrowserRouter basename={"/"}>
			<Routers />
		</BrowserRouter>
	);
};
export default App;
