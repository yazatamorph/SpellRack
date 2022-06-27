import React, { useEffect } from 'react';
import {
	Box,
	Card,
	CardActionArea,
	CardActions,
	Grid,
	IconButton,
	InputBase,
	Typography,
} from '@mui/material';
import { Add, Remove, DeleteOutlined } from '@mui/icons-material';
import { connect } from 'react-redux';

import { updateDeckCard } from '../store/utils/thunkCreators';

const NumController = ({ quantity = 0, onQuantityChange }) => {
	const handleButtonChanges = (operation, qty) => {
		let newQuantity = qty;
		if (operation === 'dec') {
			newQuantity--;
		}
		if (operation === 'inc') {
			newQuantity++;
		}
		onQuantityChange(newQuantity);
	};
	const handleInputChange = (event) => {
		event.preventDefault();
		onQuantityChange(Number(event.target.value));
	};
	return (
		<Box sx={{ display: 'flex' }} justifyContent='flex-end'>
			<IconButton
				size='small'
				onClick={() => handleButtonChanges('dec', quantity)}
			>
				<Remove fontSize='inherit' />
			</IconButton>
			<InputBase
				value={quantity}
				sx={{ maxWidth: 0.2 }}
				onChange={handleInputChange}
			/>
			<IconButton
				size='small'
				onClick={() => handleButtonChanges('inc', quantity)}
			>
				<Add fontSize='inherit' />
			</IconButton>
		</Box>
	);
};

const Item = ({ cardInfo, onCardChanges, onNewFeature }) => {
	const [scryfallId, card] = cardInfo;

	const handleQuantityChange = (quantity) => {
		onCardChanges({
			card: {
				...card,
				quantity,
				scryfallId,
			},
			quantity,
		});
	};
	const handleDelete = () => {
		onCardChanges({
			card: {
				...card,
				quantity: 0,
				scryfallId,
			},
			quantity: 0,
		});
	};
	return (
		<Grid item xs={4} sm={4} md={3}>
			<Card square variant='outlined' sx={{ display: 'flex' }}>
				<CardActionArea sx={{ px: 2 }} onClick={() => onNewFeature(card)}>
					<Typography noWrap variant='body2'>
						{card.name}
					</Typography>
				</CardActionArea>
				<CardActions>
					<NumController
						quantity={card.quantity}
						onQuantityChange={handleQuantityChange}
					/>
					<IconButton size='small' aria-label='settings' onClick={handleDelete}>
						<DeleteOutlined fontSize='inherit' />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	);
};

function DeckList(props) {
	const { deck = {}, updateDeckCard, cards = new Map(), onNewFeature } = props;
	const cardList = [...cards.entries()] || [];

	const handleCardChanges = async (change) => {
		const update = {
			deckId: deck.id,
			deckTitle: deck.title,
			card: change.card,
			quantity: change.quantity,
		};

		await updateDeckCard(update);
	};

	useEffect(() => {
		if (cardList.length) {
			const card = cardList[0][1];
			onNewFeature(card);
		}
	}, []);

	return (
		<React.Fragment>
			<Grid
				container
				item
				justifyContent='flex-start'
				alignItems='flex-start'
				rowSpacing={0.5}
				columnSpacing={0.5}
				columns={{ xs: 4, sm: 8, md: 9 }}
			>
				{cardList.map((card) => {
					return (
						<Item
							key={card[0]}
							cardInfo={card}
							onCardChanges={handleCardChanges}
							onNewFeature={onNewFeature}
						/>
					);
				})}
			</Grid>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		deck: state.deck.current,
		cards: state.deck.current.cards,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateDeckCard: (update) => {
			dispatch(updateDeckCard(update));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
