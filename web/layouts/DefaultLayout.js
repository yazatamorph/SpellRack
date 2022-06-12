import React from 'react';

import NavBar from '../components/NavBar';

export default function DefaultLayout({ children }) {
	return (
		<div>
			<NavBar />
			{children}
		</div>
	);
}
