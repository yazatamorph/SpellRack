import React, { useEffect } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { fetchOneDeck } from '../../../store/utils/thunkCreators';

import Layout from '../../../layouts/DefaultLayout';
import DeckList from '../../../components/DeckList';
import FeatureCard from '../../../components/FeatureCard';
import SearchDialogue from '../../../components/SearchDialogue';

function Deck(props) {
	const router = useRouter();
	const { username, title } = router.query;
	const { deck, fetchOneDeck } = props;

	useEffect(() => {
		if (router.isReady) {
			const deckTitle = title.replaceAll('_', ' ');
			(async () => await fetchOneDeck({ username, deckTitle }))();
		}
	}, [router, fetchOneDeck, username, title]);

	return (
		<React.Fragment>
			<Box sx={{ mb: 2 }}>
				<Typography component='h1' variant='h3'>
					{deck.title}
				</Typography>
				<Typography component='h2' variant='h5'>
					by {username}
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

const mapStateToProps = (state) => {
	return {
		deck: state.deck.current,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchOneDeck: (params) => {
			dispatch(fetchOneDeck(params));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
