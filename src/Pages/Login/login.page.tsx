import "./login.style.scss";
import TextField from "@mui/material/TextField/TextField";
import Typography from "@mui/material/Typography/Typography";
import Button from "@mui/material/Button/Button";
import { useEffect, useState } from "react";
import { LoginOptions, Severity } from "../../Utils/enums";
import { signin, signup } from "../../Services/login.service";
import { loginText, miscErr, signUpText, userCreationSuccess, userLoginSuccess } from "../../Utils/strings";
import { UserCreds } from "../../Utils/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../Utils/utilities";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import storageHelper from "../../Utils/storage.helper";

function Login() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UserCreds>({
		resolver: yupResolver(loginSchema),
	});

	const [isLogin, setIsLogin] = useState(true);
	const [sendingRequest, setSendingRequest] = useState(false);

	const navigate = useNavigate();
	const { state } = useLocation();

	useEffect(() => {
		if (state && state.emailVerifyFailed) {
			notify(Severity.error, state.emailVerifyFailed.reason);
		}
		window.history.replaceState(null, "");
	}, []);

	const submitCreds: SubmitHandler<UserCreds> = (userCreds: UserCreds) => {
		const request = isLogin ? signin(userCreds) : signup(userCreds);
		setSendingRequest(true);
		request
			.then(res => {
				notify(Severity.success, isLogin ? userLoginSuccess : res.data.message);
				if (!isLogin) {
					toggleLoginState();
				} else {
					storageHelper.accessToken = res.data.token;
					navigate("/dashboard");
				}
				setSendingRequest(false);
			})
			.catch((err: any) => {
				let errorText: string = "";
				if (err.response.status === 400) {
					errorText = err.response.data.error;
				} else {
					errorText = miscErr;
				}
				notify(Severity.error, errorText);
				setSendingRequest(false);
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
	};

	const toggleLoginState = () => {
		setIsLogin(!isLogin);
		reset({ email: "", password: "" });
	};

	return (
		<div className="bg-blue">
			<div className="login-form-layout-container">
				<div className="login-form-container">
					<div className="login-form-header">
						<h1>{isLogin ? LoginOptions.signin.toUpperCase() : LoginOptions.signup.toUpperCase()}</h1>
						<p>{isLogin ? loginText : signUpText}</p>
					</div>
					<div className="login-form">
						<div className="form-field">
							<p>E-mail</p>
							<TextField {...register("email")} autoFocus fullWidth required className="outlined-form-field" id="outlined-basic" variant="outlined" />
							<Typography variant="caption" color={"error.main"}>
								{errors.email?.message}
							</Typography>
						</div>
						<div className="form-field">
							<p>Password</p>
							<TextField {...register("password")} fullWidth className="outlined-form-field" id="outlined-basic" type="password" variant="outlined" />
							<Typography variant="caption" color={"error.main"}>
								{errors.password?.message}
							</Typography>
						</div>
						<Button disabled={sendingRequest} onClick={handleSubmit(submitCreds)} className="form-submit-btn" variant="contained">
							{isLogin ? "Log In" : "Create Account"}
						</Button>
					</div>
					<div className="member-check">
						<p>
							{isLogin ? "New User? " : "Already a member? "}
							<span onClick={toggleLoginState} className="informative">
								{isLogin ? LoginOptions.signup : LoginOptions.signin}
							</span>
						</p>
					</div>
				</div>
				<div className="image-container"></div>
			</div>

			<ToastContainer />
		</div>
	);
}

export default Login;
