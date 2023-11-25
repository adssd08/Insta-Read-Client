import { StorageKeys } from "./enums";

class StroageHelper {
	constructor() {
		console.log("Storage Helper Initialized");
	}
	get accessToken() {
		return localStorage.getItem(StorageKeys.AccessToken) as string;
	}
	set accessToken(token: string) {
		localStorage.setItem(StorageKeys.AccessToken, token);
	}
}

export default new StroageHelper();
