import axios from 'axios';
import { gotUser, setFetchingStatus } from '../user';

axios.interceptors.request.use(async function (config) {
	const token = await localStorage.getItem('SR_access_token');
	config.headers['Authorization'] = `Bearer ${token}`;

	return config;
});

const API_URL = 'http://localhost:8080';
// User thunks
export const fetchUser = () => async (dispatch) => {
	dispatch(setFetchingStatus(true));
	try {
		const { data } = await axios.get(`${API_URL}/api/user`);
		dispatch(gotUser(data));
	} catch (error) {
		console.error(error);
	} finally {
		dispatch(setFetchingStatus(false));
	}
};

export const register = (credentials) => async (dispatch) => {
	try {
		const { data } = await axios.post(
			`${API_URL}/api/user/register`,
			credentials
		);
		await localStorage.setItem('SR_access_token', data.access_token);
		await localStorage.setItem('SR_refresh_token', data.refresh_token);
		dispatch(gotUser(data));
	} catch (error) {
		console.error(error);
		dispatch(gotUser({ error: 'Server Error' }));
	}
};

export const login = (credentials) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${API_URL}/api/user/login`, credentials);
		await localStorage.setItem('SR_access_token', data.access_token);
		await localStorage.setItem('SR_refresh_token', data.refresh_token);
		dispatch(gotUser(data));
	} catch (error) {
		console.error(error);
		dispatch(gotUser({ error: 'Server Error' }));
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.delete(`${API_URL}/api/user/logout`);
		await localStorage.removeItem('SR_access_token');
		await localStorage.removeItem('SR_refresh_token');
		dispatch(gotUser({}));
	} catch (error) {
		console.error(error);
	}
};
