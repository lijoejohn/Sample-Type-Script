const LSVariable: string = process.env.REACT_APP_LS_VAR || "";

export const logout = (): void => {
	localStorage.setItem(LSVariable, "");
	window.location.href = "/login";
};

export const loginFunction = (values: { email: string; password?: string }): void => {
	// eslint-disable-next-line no-console
	localStorage.setItem(LSVariable, "Admin");
	window.location.href = "/";
};

export const getLsValue = (key: string): string => {
	return localStorage.getItem(key) || "";
};

export const setLsValue = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};
