import API from "./axios-client";


// Auth ************

export const loginMutationFn = async (data) => {
  const response = await API.post("/auth/login-client", data);
  return response.data;
};

export const changePasswordMutationFn = async (data) => {
  const response = await API.post("/auth/change-password", data);
  return response.data;
}

export const forgotPasswordMutationFn = async (data) => {
  const response = await API.post("/auth/reset-password-request", data);
  return response.data;
}

export const resetPasswordMutationFn = async (data) => {
	const response = await API.patch('/auth/reset-password', data);
	return response.data;
};

export const logoutMutationFn = async () => {
  return await API.post("/auth/logout");
};

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/auth/current-client");
  return response.data;
};

// Workspace ************
export const getAllWorkspacesUserIsMemberQueryFn = async () => {
  const response = await API.get("/workspace/user");
  console.log("Query data:", response.data);
  return response.data;
};

export const createWorkspaceMutationFn = async () => {};

export const editWorkspaceMutationFn = async () => {};

export const getWorkspaceByIdQueryFn = async () => {};

export const getWorkspaceAnalyticsQueryFn = async () => {};

export const changeWorkspaceMemberRoleMutationFn = async () => {};

export const deleteWorkspaceMutationFn = async () => {};

// Profile ************
export const updateUserProfileFieldMutationFn = async (data) => {
	console.log('Sending update request with data:', data);
	const response = await API.post('/auth/update-profile-field', data);
	return response.data;
};

// Payment ************
export const stkPushMutationFn = async (data) => {
  const response = await API.post('active-client/stk-push', data);
  return response.data;
};

export const confirmPaymentMutationFn = async (data) => {
	const response = await API.post('active-client/confirm-payment', data);
	return response.data;
};

// Subscription ********
export const getSubscriptionScheduleQueryFn = async () => {
  const response = await API.get('active-client/schedule');
  return response.data;
}

export const getInvoicesQueryFn = async () => {
  const response = await API.get('active-client/invoice-receipt');
  return response.data;
}

// Activation ************
export const getFilesQueryFn = async () => {
  const response = await API.get("active-client/uploaded-files");
  console.log("Uploaded file(s): ", response.data.files.originalFileName);
  return response.data.files;
}

export const uploadFileMutationFn = async (data) => {
  const response = await API.post("active-client/upload-file", data);
  console.log("File(s) uploaded successfully: ", response.data.originalFileName);
  return response.data;
}

export const activateAccountMutationFn = async (data) => {
  const response = await API.post("active-client/activate-client", data);
  console.log("Account successfully activated!", response.data);
}