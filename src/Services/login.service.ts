import axios from "axios";
import { urls } from "../Utils/urls";
import { UserCreds } from "../Utils/interfaces";

export const signup = (userCreds: UserCreds) => {
	return axios.post(urls.signup, userCreds);
};

export const signin = (userCreds: UserCreds) => {
	return axios.post(urls.login, userCreds);
};
