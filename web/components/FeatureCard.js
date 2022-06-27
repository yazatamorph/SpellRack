import React from 'react';
import { Grid, Paper } from '@mui/material';

import MagicCard from './MagicCard';

export default function FeatureCard({ card }) {
	return (
		<React.Fragment>
			<Grid item xs={4} sm={4} md={4}>
				{card && (
					<Paper elevation={10} sx={{ p: 2 }}>
						<MagicCard imageSource={card.imageUris} cardName={card.name} />
					</Paper>
				)}
			</Grid>
		</React.Fragment>
	);
}
