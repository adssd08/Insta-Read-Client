import { object, string } from "yup";
import storageHelper from "./storage.helper";
const getCharacterValidationError = (str: string) => {
	return `Your password must have at least 1 ${str} character`;
};

export const loginSchema = object({
	email: string().email().required(),
	password: string()
		.required("password is a required field")
		.matches(/[A-Z]/, getCharacterValidationError("uppercase"))
		.matches(/[a-z]/, getCharacterValidationError("lowercase"))
		.matches(/[0-9]/, getCharacterValidationError("digit"))
		.min(8, "Password must have at least 8 characters")
		.max(20, "Password must not be greater than 20 characters"),
}).required();

export const checkUserAuthentication = () => {
	return !!storageHelper.accessToken;
};

export const randomString = () => {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const length = 32;
	let result = "";
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
};
