import React from 'react';
import { Box, Container } from '@mui/material';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function DefaultLayout({ children }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<NavBar />
			<Container component='main' maxWidth='xl' mt={{ xs: 2, md: 0 }}>
				{children}
			</Container>
			<Footer />
		</Box>
	);
}
