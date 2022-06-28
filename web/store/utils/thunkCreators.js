import axios from 'axios';
import { clearOnLogout } from '..';
import { gotUser, setFetchingStatus } from '../user';
import { gotAllDecks, gotOneDeck, removeDeck, updatedDeckCard } from '../deck';

axios.interceptors.request.use(async function (config) {
	const token = await localStorage.getItem('SR_access_token');
	config.headers['Authorization'] = `Bearer ${token}`;

	return config;
});

const API_URL = 'http://localhost:8080/api';
// User thunks
export const fetchUser = () => async (dispatch) => {
	dispatch(setFetchingStatus(true));
	try {
		const { data } = await axios.get(`${API_URL}/user`);
		dispatch(gotUser(data));
	} catch (error) {
		console.error(error);
	} finally {
		dispatch(setFetchingStatus(false));
	}
};

export const register = (credentials) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${API_URL}/user/register`, credentials);
		if (data.id) {
			const { username, password } = credentials;
			await dispatch(login({ username, password }));
		}
	} catch (error) {
		console.error(error);
		if (error?.response?.status === 403) {
			dispatch(
				gotUser({ error: 'User with username or email already exists' })
			);
		} else {
			dispatch(gotUser({ error: 'Server Error' }));
		}
	}
};

export const login = (credentials) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${API_URL}/user/login`, credentials);
		await localStorage.setItem('SR_access_token', data.access_token);
		await localStorage.setItem('SR_refresh_token', data.refresh_token);

		dispatch(gotUser(data));
		dispatch(fetchUser());
	} catch (error) {
		console.error(error);
		dispatch(gotUser({ error: 'Server Error' }));
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.get(`${API_URL}/user/logout`);
		await localStorage.removeItem('SR_access_token');
		await localStorage.removeItem('SR_refresh_token');
		dispatch(clearOnLogout());
	} catch (error) {
		console.error(error);
	}
};

export const fetchUserDecks = (username) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${API_URL}/user/decks`, {
			username,
		});
		dispatch(gotAllDecks(data));
	} catch (error) {
		console.error(error);
	}
};

export const fetchOneDeck =
	({ username, deckTitle }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.post(`${API_URL}/user/deck`, {
				username,
				deckTitle,
			});
			dispatch(gotOneDeck(data));
		} catch (error) {
			console.error(error);
		}
	};

export const fetchAllDecks = () => async (dispatch) => {
	try {
		const { data } = await axios.get(`${API_URL}/decks`);
		dispatch(gotAllDecks(data));
	} catch (error) {
		console.error(error);
	}
};

export const createDeck = (title) => async (dispatch) => {
	try {
		const { data } = await axios.post(`${API_URL}/user/deck/new`, {
			id: null,
			title,
		});
		dispatch(gotOneDeck(data));
	} catch (error) {
		console.error(error);
	}
};

export const deleteDeck =
	({ id, title }) =>
	async (dispatch) => {
		try {
			await axios.delete(`${API_URL}/user/deck`, {
				data: {
					id,
					title,
				},
			});
			dispatch(removeDeck(id));
		} catch (error) {
			console.error(error);
		}
	};

export const updateDeckCard = (update) => async (dispatch) => {
	try {
		await axios.put(`${API_URL}/user/deck/card`, update);
		dispatch(updatedDeckCard(update));
	} catch (error) {
		console.error(error);
	}
};
