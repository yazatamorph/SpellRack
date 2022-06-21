import React, { forwardRef, useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	Container,
	Dialog,
	IconButton,
	Slide,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import SearchResults from './SearchResults';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction='left' ref={ref} {...props} />;
});

export default function SearchDialogue() {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Button variant='outlined' onClick={handleClickOpen}>
				Open full-screen dialog
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							onClick={handleClose}
							aria-label='close'
						>
							<Close />
						</IconButton>
						<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
							Find Cards
						</Typography>
					</Toolbar>
				</AppBar>
				<Container maxWidth='lg'>
					<Box
						sx={{
							my: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<TextField
							fullWidth
							id='search'
							label='Find Cards'
							name='search'
							autoFocus
							sx={{ mb: 2 }}
						/>

						<SearchResults />
					</Box>
				</Container>
			</Dialog>
		</React.Fragment>
	);
}
