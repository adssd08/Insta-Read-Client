import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { resendToken, verifyEmail } from "../../Services/login.service";
import storageHelper from "../../Utils/storage.helper";
import verifyEmailAnimation from "../../Assets/Lotties/VerifyEmailLottie.json";
import verifyFailed from "../../Assets/Lotties/EmailVerificationFailed.json";
import { ReactComponent as Logo } from "../../Assets/Logo.svg";
import { useLottie } from "lottie-react";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { Severity, TokenVerifictionErrorCodes } from "../../Utils/enums";

let token: string = "";

export default function VerifyEmail() {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [verifyView, setVerifyView] = useState(true);
	const [resending, setResending] = useState(false);

	const emailVerifyOptions = {
		animationData: verifyEmailAnimation,
		loop: true,
	};

	const verifyFailedOptions = {
		animationData: verifyFailed,
		loop: false,
	};

	const EmailVerify = useLottie(emailVerifyOptions);
	const VerifyFailed = useLottie(verifyFailedOptions);
	VerifyFailed.setSpeed(1.5);

	useEffect(() => {
		if (searchParams.get("token")) {
			token = searchParams.get("token") as string;
			console.log("Token: ", token);
			verifyEmail(token)
				.then(res => {
					storageHelper.accessToken = res.data.token;
					navigate("/dashboard");
				})
				.catch(err => {
					if (err.response.status == 400) {
						if (err.response.data.errorCode == TokenVerifictionErrorCodes.Expired) {
							setVerifyView(false);
						} else {
							navigate("/login", { state: { emailVerifyFailed: { reason: err.response.data.message } } });
						}
					}
				});
			searchParams.delete("token");
			setSearchParams(searchParams);
		} else {
			setVerifyView(false);
			navigate("/login", { state: { emailVerifyFailed: { reason: "Please provide token." } } });
		}
	}, []);

	const generateNewToken = () => {
		console.log("Token: ", token);
		setResending(true);
		resendToken(token)
			.then(res => {
				setResending(false);
				notify(Severity.success, res.data.message);
			})
			.catch(err => {
				setResending(false);
				if (err.response.status == 400) {
					if (err.response.data.errorCode == TokenVerifictionErrorCodes.AnotherTokenSent) {
						notify(Severity.error, err.response.data.message);
					} else {
						navigate("/login", { state: { emailVerifyFailed: { reason: err.response.data.message } } });
					}
				} else {
					navigate("/login", { state: { emailVerifyFailed: { reason: "Something Went Wrong" } } });
				}
			});
	};

	const notify = (severity: Severity, toastText: string) => {
		const props: ToastOptions = {
			position: toast.POSITION.BOTTOM_LEFT,
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		};

		if (severity === Severity.success) {
			toast.success(toastText, props);
		} else {
			toast.error(toastText, props);
		}
		console.log("Notification Triggered");
	};

	return (
		<Box sx={{ width: "100vw", height: "100vh" }}>
			<Box sx={{ width: "40vw", margin: "auto", display: "flex", flexDirection: "column", gap: "120px", alignItems: "center", justifyContent: "center" }}>
				<Logo />
				<Box sx={{ padding: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "center" }}>
					<Box sx={{ width: "400px", height: "400px", display: verifyView ? "block" : "none" }}>{EmailVerify.View}</Box>
					<Box sx={{ width: "400px", height: "400px", display: !verifyView ? "block" : "none" }}>{VerifyFailed.View}</Box>
					<Typography variant="h4">{verifyView ? "Verifying your email. Please Wait...." : "Token expired generate a new one"}</Typography>
					<Button disabled={resending} variant="contained" sx={{ display: verifyView ? "none" : "block" }} onClick={generateNewToken}>
						Resend Token
					</Button>
				</Box>
			</Box>
			<ToastContainer />
		</Box>
	);
}
