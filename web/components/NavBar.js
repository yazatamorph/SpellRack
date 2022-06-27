import React, { useEffect, useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import { logout } from '../store/utils/thunkCreators';

function NavBar(props) {
	const { logout, user } = props;

	const [anchorEl, setAnchorEl] = useState(null);
	const isMenuOpen = Boolean(anchorEl);
	// TODO: needs to be set based on existence of token or w/e
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const router = useRouter();

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLoginButton = () => {
		router.push('/signin');
	};

	const handleRegisterButton = () => {
		router.push('/signup');
	};

	const handleMyDecks = () => {
		router.push(`/${user.username}/decks`);
		handleMenuClose();
	};

	const handleLogout = async () => {
		await logout();
		router.push('/');
		handleMenuClose();
	};

	useEffect(() => {
		setIsLoggedIn(!!user.id);
	}, [user?.id]);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMyDecks}>My Decks</MenuItem>
			<MenuItem onClick={handleLogout}>Logout</MenuItem>
		</Menu>
	);

	return (
		<>
			<AppBar position='fixed'>
				<Toolbar variant='dense'>
					<Typography
						variant='h6'
						noWrap
						component='a'
						sx={{ display: { xs: 'none', sm: 'block' } }}
						onClick={() => router.push('/')}
					>
						ScrollRack
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{isLoggedIn ? (
							<Button
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								endIcon={<AccountCircle />}
								color='inherit'
							>
								Hi, {user.username}!
							</Button>
						) : (
							/* TODO: fix button color */
							<div>
								<Button
									color='primary'
									variant='contained'
									disableElevation
									onClick={handleLoginButton}
								>
									Login
								</Button>
								<Button
									color='primary'
									variant='contained'
									disableElevation
									onClick={handleRegisterButton}
								>
									Register
								</Button>
							</div>
						)}
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
			{renderMenu}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
