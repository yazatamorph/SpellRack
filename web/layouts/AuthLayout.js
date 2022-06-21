import React from 'react';
import { Box } from '@mui/material';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

export default function AuthLayout({ children }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			}}
		>
			<NavBar />
			{children}
			<Footer />
		</Box>
	);
}
