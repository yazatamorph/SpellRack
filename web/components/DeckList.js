import React from 'react';
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
import { Add, Remove, SettingsOutlined } from '@mui/icons-material';

const NumController = ({ quantity = 0 }) => {
	return (
		<Box sx={{ display: 'flex' }} justifyContent='flex-end'>
			<IconButton size='small'>
				<Remove fontSize='inherit' />
			</IconButton>
			<InputBase value={quantity} sx={{ maxWidth: 0.2 }} />
			<IconButton size='small'>
				<Add fontSize='inherit' />
			</IconButton>
		</Box>
	);
};

const Item = ({ cardInfo }) => {
	return (
		<Grid item xs={4} sm={4} md={3}>
			<Card square variant='outlined' sx={{ display: 'flex' }}>
				<CardActionArea sx={{ px: 2 }}>
					<Typography noWrap variant='body2'>
						I&apos;m gonna be a deck list.
					</Typography>
				</CardActionArea>
				<CardActions>
					<NumController />
					<IconButton size='small' aria-label='settings'>
						<SettingsOutlined fontSize='inherit' />
					</IconButton>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default function DeckList() {
	const deckCards = Array.from(Array(100));

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
				{deckCards.map((_, i) => (
					<Item key={i} />
				))}
			</Grid>
		</React.Fragment>
	);
}
