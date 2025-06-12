import API from './axios-client';

// Auth ************

export const loginMutationFn = async (data) => {
	const response = await API.post('/auth/login', data);
	return response.data;
};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => {
	return await API.post('/auth/logout');
};

export const getCurrentUserQueryFn = async () => {
	const response = await API.get('/auth/current-user');
	return response.data;
};

// Workspace ************
export const getAllWorkspacesUserIsMemberQueryFn = async () => {
	const response = await API.get('/workspace/user');
	console.log('Query data:', response.data);
	return response.data;
};

export const createWorkspaceMutationFn = async () => {};

export const editWorkspaceMutationFn = async () => {};

export const getWorkspaceByIdQueryFn = async () => {};


export const getWorkspaceAnalyticsQueryFn = async () => {};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async () => { };

// Profile ************


export const getUserProfileQueryFn = async () => {}
export const updateUserProfileQueryFn = async () => {}

// Payment ************
export const getSubscriptionQueryFn = async (data) => {
	const response = await API.get('/payment/subscription', data);
	return response.data;
}





