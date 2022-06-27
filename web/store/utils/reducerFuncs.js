export const loadedAllDecks = (state, decks) => {
	const all = new Map(Object.entries(decks));
	const newState = { ...state, all };
	return newState;
};

export const loadedCurrentDeck = (state, deck) => {
	const cards = new Map();

	for (const [id, c] of Object.entries(deck.cards)) {
		const {
			uri = '',
			scryfallUri = '',
			name = '',
			typeLine = '',
			setName = '',
			set_abbr = '',
			rarity = '',
			cmc = 0,
			collectorNumber = 0,
			imageUris = [],
			colors = [],
			colorIdentity = [],
			printsSearchUri = '',
		} = c.card;
		cards.set(id, {
			quantity: c.quantity,
			uri,
			scryfallUri,
			name,
			typeLine,
			setName,
			set_abbr,
			rarity,
			cmc,
			collectorNumber,
			imageUris,
			colors,
			colorIdentity,
			printsSearchUri,
		});
	}
	const newState = { ...state, current: { ...deck, cards } };
	return newState;
};

export const removedDeckFromStore = (state, id) => {
	const all = new Map(state.all);
	all.delete(id);
	const newState = { ...state, all };
	return newState;
};

export const updatedCard = (state, update) => {
	const current = { ...state.current };
	const cards = new Map(current.cards);

	const {
		uri = '',
		scryfallUri = '',
		name = '',
		typeLine = '',
		setName = '',
		set_abbr = '',
		rarity = '',
		cmc = 0,
		collectorNumber = 0,
		imageUris = [],
		colors = [],
		colorIdentity = [],
		printsSearchUri = '',
	} = update.card;

	update.quantity > 0
		? cards.set(update.card.scryfallId, {
				quantity: update.quantity,
				uri,
				scryfallUri,
				name,
				typeLine,
				setName,
				set_abbr,
				rarity,
				cmc,
				collectorNumber,
				imageUris,
				colors,
				colorIdentity,
				printsSearchUri,
		  })
		: cards.delete(update.card.scryfallId);

	const newState = { ...state, current: { ...current, cards } };
	return newState;
};
