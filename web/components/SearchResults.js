import React from 'react';
import { Grid } from '@mui/material';

import SearchResultCard from './SearchResultCard';

export default function SearchResults(props) {
	const { cards } = props;
	const handleAddCardData = (card) => {
		const newCard = {
			scryfallId: card.id,
			uri: card.uri,
			scryfallUri: card.scryfall_uri,
			name: card.name,
			typeLine: card.type_line,
			setName: card.set_name,
			set_abbr: card.set,
			rarity: card.rarity,
			cmc: card.cmc,
			collectorNumber: card.collector_number,
			imageUris: [],
			colors: card.colors,
			colorIdentity: card.color_identity,
			printsSearchUri: card.prints_search_uri,
		};
		if (card?.image_uris?.normal) {
			newCard.imageUris.push(card.image_uris.normal);
		}
		if (
			card?.card_faces?.length &&
			card?.card_faces[0]?.image_uris &&
			card?.card_faces[1]?.image_uris
		) {
			newCard.imageUris.push(card.card_faces[0].image_uris.normal);
			newCard.imageUris.push(card.card_faces[1].image_uris.normal);
		}
		return newCard;
	};

	return (
		<React.Fragment>
			<Grid container columns={12} spacing={2}>
				{cards.map((card, i) => {
					const sanitized = handleAddCardData(card);
					return (
						<Grid key={i} item md={6}>
							<SearchResultCard card={sanitized} />
						</Grid>
					);
				})}
			</Grid>
		</React.Fragment>
	);
}
