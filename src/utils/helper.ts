const LSVariable: string = process.env.REACT_APP_LS_VAR || "";

export const logout = (): void => {
	localStorage.setItem(LSVariable, "");
	window.location.href = "/login";
};

export const loginFunction = (values: { email; password: string }): boolean => {
	if (values.email === "admin@test.com" && values.password === "@123456!") {
		localStorage.setItem(LSVariable, "Admin");
		return true;
	} else {
		return false;
	}
};

export const getLsValue = (key: string): string => {
	return localStorage.getItem(key) || "";
};

export const setLsValue = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};
