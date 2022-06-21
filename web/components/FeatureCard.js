import React from 'react';
import { Grid, Paper } from '@mui/material';

import MagicCard from './MagicCard';
/* <FeatureCard
	imageSource={[
		'https://c1.scryfall.com/file/scryfall-cards/normal/front/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
		'https://c1.scryfall.com/file/scryfall-cards/normal/back/b/0/b0fe4b53-18f6-42eb-b03f-cab3e5a7fba6.jpg?1637022472',
	]}
	cardName='Clearwater Pathway / Murkwater Pathway'
/> */
export default function FeatureCard({ imageSource, cardName }) {
	return (
		<React.Fragment>
			<Grid item xs={4} sm={4} md={4}>
				<Paper elevation={10} sx={{ p: 2 }}>
					<MagicCard imageSource={imageSource} cardName={cardName} />
				</Paper>
			</Grid>
		</React.Fragment>
	);
}
