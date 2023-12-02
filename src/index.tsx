import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from "./reportWebVitals";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginRoute from "./Routes/login.route";
import DashboardRoute from "./Routes/dashboard.route";
import VerifyEmailRoute from "./Routes/verifytoken.route";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { loginLoader, protectedLoader } from "./Services/login.service";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/login" loader={loginLoader} element={<LoginRoute />} />,
		<Route path="/dashboard" loader={protectedLoader} element={<DashboardRoute />} />,
		<Route path="/verify-email" element={<VerifyEmailRoute />} />,
		<Route path="*" element={<Navigate replace to="/dashboard" />} />,
	])
);

root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
