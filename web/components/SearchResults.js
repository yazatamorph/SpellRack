import React from 'react';
import { Grid } from '@mui/material';

import SearchResultCard from './SearchResultCard';

export default function SearchResults() {
	return (
		<React.Fragment>
			<Grid container columns={12} spacing={2}>
				{Array.from(Array(7)).map((_, i) => (
					<Grid key={i} item md={6}>
						<SearchResultCard />
					</Grid>
				))}
			</Grid>
		</React.Fragment>
	);
}
