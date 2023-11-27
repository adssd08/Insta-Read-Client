import axios from "axios";
import { urls } from "../Utils/urls";
import { UserCreds } from "../Utils/interfaces";
import { checkUserAuthentication } from "../Utils/utilities";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const signup = (userCreds: UserCreds) => {
	return axios.post(urls.signup, userCreds);
};

export const signin = (userCreds: UserCreds) => {
	return axios.post(urls.login, userCreds);
};

export const protectedLoader = ({ request }: LoaderFunctionArgs) => {
	if (!checkUserAuthentication()) {
		let params = new URLSearchParams();
		params.set("from", new URL(request.url).pathname);
		return redirect("/login?" + params.toString());
	}
	return null;
};

export const loginLoader = ({ request }: LoaderFunctionArgs) => {
	if (checkUserAuthentication()) {
		return redirect("/dashboard");
	}
	return null;
};
