import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { DeleteOutlined, StyleOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { createDeck, deleteDeck } from '../store/utils/thunkCreators';

const DeckBox = ({ owner, router, onDelete, deckInfo }) => {
	const [id, deck] = deckInfo;
	const handleDelete = () => {
		onDelete({ id, title: deck.title });
	};

	return (
		<Grid item xs={4} sm={4} md={6}>
			<Card>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: 'secondary' }} variant='rounded'>
							<StyleOutlined />
						</Avatar>
					}
					title={deck.title}
					action={
						<Button
							variant='outlined'
							onClick={() =>
								router.push(`/${owner}/deck/${deck.title.replaceAll(' ', '_')}`)
							}
						>
							View
						</Button>
					}
				/>

				<CardActions>
					<IconButton variant='text' color='error' onClick={handleDelete}>
						<DeleteOutlined />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	);
};

function AllDecks(props) {
	const router = useRouter();
	const { createDeck, deleteDeck, owner, decks = new Map() } = props;
	const allDecks = [...decks.entries()] || [];

	const [open, setOpen] = useState(false);

	const handleDelete = async (params) => {
		await deleteDeck(params);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const title = data.get('title');
		if (title.includes('_')) {
			setFormErrorMessage({ title: 'Title may not contain underscores (_)' });
			return;
		}

		await createDeck(title);
		router.push(`/${owner}/deck/${title}`);
	};

	return (
		<React.Fragment>
			<Grid
				container
				item
				justifyContent='flex-start'
				alignItems='flex-start'
				rowSpacing={1}
				columnSpacing={1}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={8} md={12}>
					<Stack direction='row'>
						<Typography variant='h5' component='h1' gutterBottom>
							All Decks: {owner}
						</Typography>
						<Box sx={{ flexGrow: 1 }} />
						<Button
							color='inherit'
							variant='outlined'
							onClick={handleClickOpen}
						>
							New Deck
						</Button>
					</Stack>
				</Grid>
				{allDecks.map((deck) => {
					return (
						<DeckBox
							key={deck[0]}
							owner={owner}
							router={router}
							deckInfo={deck}
							onDelete={handleDelete}
						/>
					);
				})}
			</Grid>
			<Dialog open={open} onClose={handleClose}>
				<Box component='form' onSubmit={handleSubmit}>
					<DialogTitle>New Deck</DialogTitle>
					<DialogContent>
						<DialogContentText>
							To get started on your new deck, give it a name!
						</DialogContentText>
						<TextField
							name='title'
							required
							id='title'
							label='Deck Title'
							type='title'
							autoFocus
							margin='dense'
							fullWidth
							variant='standard'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button type='submit'>Go</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		decks: state.deck.all,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteDeck: (params) => {
			dispatch(deleteDeck(params));
		},
		createDeck: (title) => {
			dispatch(createDeck(title));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDecks);
