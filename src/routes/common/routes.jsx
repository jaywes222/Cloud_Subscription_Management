import React from "react";
import SignIn from "../../page/auth/Sign-in";
import WorkspaceDashboard from "../../page/workspace/Dashboard";
import Profile from "../../page/workspace/Profile";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "./routePaths";
import Activation from "../../components/bootstrap/Activation/Activation";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.SIGN_IN, element: <SignIn /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.WORKSPACE, element: <WorkspaceDashboard /> },
  { path: PROTECTED_ROUTES.PROFILE, element: <Profile /> },
  { path: PROTECTED_ROUTES.ACTIVATION, element: <Activation /> },
];
