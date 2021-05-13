/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import * as ReactDOM from "react-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";

import Login from "./components/login/index";
import DashBoard from "./components/dashBorad/index";
import AppModal from "./components/sharedComponents/modal";

import { shallow } from "enzyme";
import Enzyme from "enzyme";
import ReactSixteenAdapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new ReactSixteenAdapter() });

describe("Login component tests", () => {
	let container: HTMLDivElement;
	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		ReactDOM.render(<Login />, container);
	});

	afterEach(() => {
		document.body.removeChild(container);
		container.remove();
	});

	it("Renders correctly initial document", () => {
		const inputs = container.querySelectorAll("input");
		expect(inputs).toHaveLength(2);
		expect(inputs[0].name).toBe("email");
		expect(inputs[1].name).toBe("password");
	});
});

describe("Login Page", () => {
	it("submits correct values", async () => {
		const { container } = render(<Login />);
		const email = container.querySelector("[data-test='email']");
		const password = container.querySelector("[data-test='password']");
		const submit = container.querySelector("[data-test='login-button']");
		await waitFor(() => {
			if (email !== null) {
				fireEvent.change(email, { target: { value: "admin@test.com" } });
			}
		});
		await waitFor(() => {
			if (password !== null) {
				fireEvent.change(password, { target: { value: "@123456!" } });
			}
		});
		await waitFor(() => {
			if (submit !== null) {
				fireEvent.click(submit);
			}
		});
		const statusLabel = await waitFor(() => container.querySelector("[data-test='toaster']"));
		expect(statusLabel).not.toBeInTheDocument();
	});
});

describe("DashBoard", () => {
	it("Initial Load", async () => {
		const { container } = render(<DashBoard />);
		const statusLabel = await waitFor(() => container.querySelector("[data-test='dashboard-wrap']"));
		expect(statusLabel).toBeInTheDocument();
	});
	it("Add Language Action Check", async () => {
		const container = document.createElement("div");
		document.body.appendChild(container);
		const wrapper = shallow(<DashBoard />, { attachTo: container });
		const submit = wrapper.find("[data-test='add-language']").first();
		submit.simulate("click");
		const submitDisabled = wrapper.find("[data-test='add-language']").first();
		expect(submitDisabled.prop("disabled")).toBeTruthy();
	});

	it("Add Language Popup Check", async () => {
		const container = document.createElement("div");
		document.body.appendChild(container);
		const wrapper = await shallow(
			<AppModal
				{...{
					onHide: () => {},
					show: true,
					title: "Add languages",
					component: <span data-test="add-poup">Hello</span>,
					secondaryAction: () => {},
					primaryAction: () => {},
				}}
			/>,
			{ attachTo: container }
		);
		const submitDisabled = wrapper.find("[data-test='popup']");
		expect(submitDisabled.length).toBeTruthy();
	});
});
