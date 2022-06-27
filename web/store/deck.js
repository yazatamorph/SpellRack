import {
	loadedAllDecks,
	loadedCurrentDeck,
	removedDeckFromStore,
	updatedCard,
} from './utils/reducerFuncs';
// ACTIONS
const REMOVE_DECK = 'REMOVE_DECK';
const GET_ALL_DECKS = 'GET_ALL_DECKS';
const GET_ONE_DECK = 'GET_ONE_USER_DECK';
const UPDATED_DECK_CARD = 'UPDATED_DECK_CARD';

// ACTION CREATORS
export const gotAllDecks = (decks) => {
	return {
		type: GET_ALL_DECKS,
		decks,
	};
};

export const gotOneDeck = (deck) => {
	return {
		type: GET_ONE_DECK,
		deck,
	};
};

export const removeDeck = (id) => {
	return {
		type: REMOVE_DECK,
		id,
	};
};

export const updatedDeckCard = (update) => {
	return {
		type: UPDATED_DECK_CARD,
		update,
	};
};

// REDUCER
const reducer = (state = { all: new Map(), current: {} }, action) => {
	switch (action.type) {
		case GET_ALL_DECKS:
			return loadedAllDecks(state, action.decks);
		case GET_ONE_DECK:
			return loadedCurrentDeck(state, action.deck);
		case REMOVE_DECK:
			return removedDeckFromStore(state, action.id);
		case UPDATED_DECK_CARD:
			return updatedCard(state, action.update);
		default:
			return state;
	}
};

export default reducer;
