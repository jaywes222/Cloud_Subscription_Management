export const AUTH_ROUTES = {
  SIGN_IN: "/",
};

export const PROTECTED_ROUTES = {
  WORKSPACE: "/workspace/:workspaceId",
  PROFILE: "/workspace/:workspaceId/profile",
  ACTIVATION: "/workspace/:workspaceId/activation",
};

export const isAuthRoute = (pathname) => {
  return Object.values(AUTH_ROUTES).includes(pathname);
};

export const resolveRoute = (template, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, val]) => path.replace(`:${key}`, val),
    template
  );
};
