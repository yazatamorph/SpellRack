import React from 'react';
import { Box, Container } from '@mui/material';

import Footer from '../components/Footer';
import Link from '../components/Link';
import NavBar from '../components/NavBar';

export default function HomeLayout({ children }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<NavBar />
			<Container component='main' maxWidth='lg' mt={{ xs: 2, md: 0 }}>
				{children}
				<Link href='/about' color='secondary'>
					Go to the about page
				</Link>
			</Container>
			<Footer />
		</Box>
	);
}
