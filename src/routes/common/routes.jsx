import React from "react";
import SignIn from "../../page/auth/Sign-in";
import WorkspaceDashboard from "../../page/workspace/Dashboard";
import Profile from "../../page/workspace/Profile";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Activation from "../../components/bootstrap/Activation/Activation";
import ChangePassword from "../../page/auth/Change-Password";
import ForgotPassword from "../../page/auth/Forgot-Password";
import ResetPassword from "../../page/auth/Reset-Password";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
  { path: AUTH_ROUTES.CHANGE_PASSWORD, element: <ChangePassword /> },
  { path: AUTH_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: AUTH_ROUTES.RESET_PASSWORD, element: <ResetPassword /> } 
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
  { path: PROTECTED_ROUTES.ACTIVATION, element: <Activation /> },
];
