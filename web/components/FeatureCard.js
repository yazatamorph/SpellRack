import React from 'react';
import { Grid, Paper } from '@mui/material';

import MagicCard from './MagicCard';

export default function FeatureCard({ imageSource, cardName }) {
	return (
		<React.Fragment>
			<Grid item xs={12} md={3}>
				<Paper elevation={10} sx={{ p: 2 }}>
					<MagicCard imageSource={imageSource} cardName={cardName} />
				</Paper>
			</Grid>
		</React.Fragment>
	);
}
