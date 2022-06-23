import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

import Layout from '../layouts/DefaultLayout';
import DeckList from '../components/DeckList';
import FeatureCard from '../components/FeatureCard';
import SearchDialogue from '../components/SearchDialogue';

export default function Deck() {
	return (
		<React.Fragment>
			<Box sx={{ mb: 2 }}>
				<Typography component='h1' variant='h3'>
					My Deck Title
				</Typography>
				<Typography component='h2' variant='h5'>
					by Some Nerd
				</Typography>
			</Box>
			<Grid
				container
				columns={{ xs: 4, sm: 8, md: 12 }}
				justifyContent='flex-start'
			>
				<Stack
					columnGap={0.5}
					rowGap={0.5}
					direction={{ xs: 'column', sm: 'row' }}
				>
					<FeatureCard
						imageSource={[
							'https://c1.scryfall.com/file/scryfall-cards/normal/front/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
							'https://c1.scryfall.com/file/scryfall-cards/normal/back/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
						]}
						cardName='Clearwater Pathway / Murkwater Pathway'
					/>

					<DeckList />
				</Stack>
			</Grid>
			<Box sx={{ my: 2 }}></Box>
			<SearchDialogue />
		</React.Fragment>
	);
}

Deck.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
