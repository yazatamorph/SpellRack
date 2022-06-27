import React from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Typography,
} from '@mui/material';
import { connect } from 'react-redux';

import MagicCard from './MagicCard';
import { updateDeckCard } from '../store/utils/thunkCreators';

function SearchResultCard(props) {
	const { card, deck, updateDeckCard } = props;

	const handleAdd = async () => {
		await updateDeckCard({
			deckId: deck.id,
			deckTitle: deck.title,
			card: {
				...card,
				quantity: 1,
			},
			quantity: 1,
		});
	};

	return (
		<React.Fragment>
			<Card
				sx={{
					p: 2,
					display: 'flex',
					flexDirection: { xs: 'column', md: 'row' },
				}}
			>
				<Grid container columns={12}>
					<Grid item xs={12} md={4}>
						<MagicCard imageSource={card.imageUris} cardName={card.name} />
					</Grid>
					<Box
						sx={{
							ml: { md: 2 },
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<CardContent>
							<Typography gutterBottom variant='h5'>
								{card.name}
							</Typography>
							<Typography variant='body2'>{card.typeLine}</Typography>
							<Typography variant='body2'>
								{card.set} ({card.set_abbr}) #{card.collectorNumber} |{' '}
								{card.rarity}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								size='medium'
								variant='contained'
								color='primary'
								onClick={handleAdd}
							>
								Add to Deck
							</Button>
						</CardActions>
					</Box>
				</Grid>
			</Card>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		deck: state.deck.current,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateDeckCard: (params) => {
			dispatch(updateDeckCard(params));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultCard);
