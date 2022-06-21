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

import MagicCard from './MagicCard';

export default function SearchResultCard({ cardData }) {
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
						<MagicCard
							imageSource={[
								'https://c1.scryfall.com/file/scryfall-cards/normal/front/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
								'https://c1.scryfall.com/file/scryfall-cards/normal/back/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
							]}
							cardName='Clearwater Pathway / Murkwater Pathway'
						/>
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
								Card Name
							</Typography>
							<Typography variant='body2'>Card Type - A Type</Typography>
						</CardContent>
						<CardActions>
							<Button size='medium' variant='contained' color='primary'>
								Add to Deck
							</Button>
						</CardActions>
					</Box>
				</Grid>
			</Card>
		</React.Fragment>
	);
}
