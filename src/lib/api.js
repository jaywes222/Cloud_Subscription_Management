import API from './axios-client';

// Auth ************

export const loginMutationFn = async () => {};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => {
	return await API.post('/auth/logout');
};

export const getCurrentUserQueryFn = async () => {
	const response = await API.get('/user/current');
	return response.data;
};

// Workspace ************

export const createWorkspaceMutationFn = async () => {};

export const editWorkspaceMutationFn = async () => {};

export const getWorkspaceByIdQueryFn = async () => {};

export const getAllWorkspacesUserIsMemberQueryFn = async () => {
	return await API.get('/workspace');
};

export const getWorkspaceAnalyticsQueryFn = async () => {};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async () => { };

// Profile ************


export const getUserProfileQueryFn = async () => {}
export const updateUserProfileQueryFn = async () => {}





