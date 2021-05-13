const LSVariable: string = process.env.REACT_APP_LS_VAR || "";
/**
 * Utility function for login callback
 * Static business logic added since we dnt have API
 */
export const loginFunction = (values: { email; password: string }): boolean => {
	if (values.email === "admin@test.com" && values.password === "@123456!") {
		setLsValue(LSVariable, "Admin");
		return true;
	} else {
		return false;
	}
};

/**
 * Utility function fetching data from localStorage using key name
 */
export const getLsValue = (key: string): string => {
	return localStorage.getItem(key) || "";
};

/**
 * Utility function setting data to localStorage using key name
 */
export const setLsValue = (key: string, value: string): void => {
	localStorage.setItem(key, value);
};
