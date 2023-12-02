const serverUrl = `${process.env.REACT_APP_SERVER_URL}`;
export namespace urls {
	export const signup = `${serverUrl}/signup`;
	export const login = `${serverUrl}/login`;
	export const verifyToken = `${serverUrl}/verify-token`;
	export const resendToken = `${serverUrl}/resend-token`;
}
