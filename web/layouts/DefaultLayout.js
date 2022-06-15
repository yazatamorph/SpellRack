import React from 'react';
import { Box, Container } from '@mui/material';

import Link from '../components/Link';
import NavBar from '../components/NavBar';

export default function DefaultLayout({ children }) {
	return (
		<div>
			<NavBar />
			<Container maxWidth='lg'>
				<Box mt={2}>
					{children}
					<Link href='/about' color='secondary'>
						Go to the about page
					</Link>
				</Box>
			</Container>
		</div>
	);
}
