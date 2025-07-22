export const AUTH_ROUTES = {
	SIGN_IN: '/',
	CHANGE_PASSWORD: '/change-password/:cusCode',
	FORGOT_PASSWORD: '/forgot-password',
	RESET_PASSWORD: '/reset-password/:token',
};

export const PROTECTED_ROUTES = {
    WORKSPACE: "/workspace/:workspaceId",
    PROFILE: "/workspace/:workspaceId/profile",
    ACTIVATION: "/workspace/:workspaceId/activation",
};

export const isAuthRoute = (pathname) => {
	return Object.values(AUTH_ROUTES).some((routePattern) => {
		// route param pattern to a regex
		const regex = new RegExp(
			`^${routePattern.replace(/:[^/]+/g, '[^/]+')}$`
		);
		return regex.test(pathname);
	});
};


export const resolveRoute = (template, params = {}) => {
	return template.replace(/:([a-zA-Z]+)/g, (_, key) =>
		params[key] !== undefined ? params[key] : `:${key}`
	);
};
