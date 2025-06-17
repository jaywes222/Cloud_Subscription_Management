import axios from 'axios';

const baseURL = import.meta.env.VITE_API_CLIENT_STK_URL;

const options = {
	baseURL,
	timeout: 10000,
};

const STK_API = axios.create(options);

// Access Key Middleware
STK_API.interceptors.request.use(
	(config) => {
		const accessKey = import.meta.env.VITE_CLIENT_STK_KEY;

		if (accessKey) {
			config.headers['accesskey'] = accessKey;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// ✅ Handles Response Issues
STK_API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const { response } = error;

		if (response) {
			const { data, status } = response;

			if (data === 'Unauthorized' && status === 401) {
				window.location.href = '/';
			}

			return Promise.reject({ ...data });
		}

		return Promise.reject({
			message: 'Network error or server did not respond.',
			originalError: error,
		});
	}
);

export default STK_API;
