import React from 'react';
import { Box, Container, Typography } from '@mui/material';

import Link from './Link';

// TODO: complete Footer content
export default function Footer() {
	return (
		<Box
			component='footer'
			sx={{
				py: 3,
				px: 2,
				mt: 'auto',
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? theme.palette.grey[200]
						: theme.palette.grey[800],
			}}
		>
			<Container maxWidth='lg'>
				<Typography variant='body1'>
					<Link href='/about'>My sticky footer can be found here.</Link>
				</Typography>
			</Container>
		</Box>
	);
}
