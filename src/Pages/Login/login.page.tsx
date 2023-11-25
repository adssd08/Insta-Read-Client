import "./login.style.scss";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import { Alert } from "@mui/material";
import { LoginOptions, Severity } from "../../Utils/enums";
import { signin, signup } from "../../Services/login.service";
import { loginText, miscErr, signUpText, userCreationSuccess, userLoginSuccess } from "../../Utils/strings";
import { UserCreds } from "../../Utils/interfaces";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [popupText, setPopupText] = useState("");
	const [password, setPassword] = useState("");
	const [open, setOpen] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [severity, setSeverity] = useState(Severity.info);

	const navigate = useNavigate();

	const submitCreds = () => {
		const userCreds: UserCreds = { email, password };
		const request = isLogin ? signin(userCreds) : signup(userCreds);

		request
			.then(_ => {
				setSeverity(Severity.success);
				setPopupText(isLogin ? userLoginSuccess : userCreationSuccess);
				if (!isLogin) {
					toggleLoginState();
				} else {
					navigate("/dashboard");
				}
			})
			.catch((err: any) => {
				setSeverity(Severity.error);
				if (err.response.status == 400) {
					setPopupText(err.response.data.error);
				} else {
					setPopupText(miscErr);
				}
			})
			.finally(() => {
				setOpen(true);
			});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleLoginState = () => {
		setIsLogin(!isLogin);
		setEmail("");
		setPassword("");
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
							<TextField
								value={email}
								onChange={event => {
									setEmail(event.target.value);
								}}
								autoFocus
								fullWidth
								required
								className="outlined-form-field"
								id="outlined-basic"
								variant="outlined"
							/>
						</div>
						<div className="form-field">
							<p>Password</p>
							<TextField
								value={password}
								onChange={event => {
									setPassword(event.target.value);
								}}
								fullWidth
								required
								className="outlined-form-field"
								id="outlined-basic"
								type="password"
								variant="outlined"
							/>
						</div>
						<Button onClick={submitCreds} className="form-submit-btn" variant="contained">
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

			<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity}>
					{popupText}
				</Alert>
			</Snackbar>
		</div>
	);
}

export default Login;
