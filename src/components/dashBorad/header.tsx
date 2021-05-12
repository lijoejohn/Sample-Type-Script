import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { Button } from "react-bootstrap";
import AppToolTip from "../sharedComponents/tooltip";
import { logout } from "../../utils/helper";

const Header = ({ setExpanded, expanded }: InferProps<typeof Header.propTypes>): JSX.Element => {
	return (
		<>
			<Button className="btn btn-lg btn-primary">
				New Project<span className="p-2">⇧⌘P</span>
			</Button>
			<AppToolTip
				component={
					<Button
						onClick={() => {
							setExpanded(!expanded);
						}}
						className="btn btn-lg btn-secondary">
						{expanded ? "Collaps" : "Expand"} All
					</Button>
				}
				message={`${expanded ? "Collaps" : "Expand"} Language Deatils`}
			/>
			<AppToolTip
				component={
					<span onClick={logout} className="logout label hand">
						Logout
					</span>
				}
				message="Logout From The Application"
			/>
		</>
	);
};
Header.propTypes = {
	setExpanded: PropTypes.func,
	expanded: PropTypes.bool,
};

export default Header;
