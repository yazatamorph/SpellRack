import React, { forwardRef, useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	Container,
	Dialog,
	IconButton,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { CatchingPokemonSharp, Close } from '@mui/icons-material';
import axios from 'axios';

import SearchResults from './SearchResults';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='left' ref={ref} {...props} />;
});

export default function SearchDialogue() {
	const [open, setOpen] = useState(false);
	const [results, setResults] = useState([]);
	const [totalCards, setTotalCards] = useState(null);
	const [displayed, setDisplayed] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handleSearch = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const terms = data.get('search');
		try {
			let { data } = await axios.get(
				`https://api.scryfall.com/cards/search?order=set&q=${terms.replaceAll(
					' ',
					'+'
				)}`
			);
			console.log('Things still happen', data);
			const { total_cards = null } = data;
			let {
				has_more = false,
				next_page = undefined,
				data: currentResults = [],
			} = data;
			console.log('beep', currentResults);
			while (has_more) {
				const res = await axios.get(next_page);
				data = res.data;
				has_more = data.has_more;
				if (data.has_more) {
					next_page = data.next_page;
				}
				console.log('Yep, still working');
				currentResults = [...currentResults, ...data.data];
			}

			setResults(currentResults);
			setTotalCards(total_cards);
			setTotalPages(Math.ceil(totalCards / 20));
		} catch (err) {
			console.error('Problem getting results from Scryfall', err);
		}
	};

	const makePages = (pageNum) => {
		const toDisplay = [];
		const startIndex = pageNum * 20 - 20;
		const endIndex = pageNum * 20 > totalCards ? totalCards : pageNum * 20;
		for (let i = startIndex; i < endIndex; i++) {
			toDisplay.push(results[i]);
		}
		setDisplayed(toDisplay);
		setCurrentPage(pageNum);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant='outlined' color='inherit' onClick={handleClickOpen}>
				Find Cards
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
							Find Cards
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth='lg'>
					<Box
						component='form'
						onSubmit={handleSearch}
						sx={{
							my: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<TextField
							fullWidth
							id='search'
							label='Find Cards'
							name='search'
							autoFocus
							sx={{ mb: 2 }}
						/>
						<SearchResults cards={results} />
					</Box>
				</Container>
			</Dialog>
		</React.Fragment>
	);
}
