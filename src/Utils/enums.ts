export enum Severity {
	success = "success",
	error = "error",
	warning = "warning",
	info = "info",
}

export enum LoginOptions {
	signup = "Sign up",
	signin = "Sign in",
}

export enum StorageKeys {
	AccessToken = "AccessToken",
}

export enum TokenVerifictionErrorCodes {
	Expired,
	AlreadyVerified,
	Invalid,
	AnotherTokenSent,
}
