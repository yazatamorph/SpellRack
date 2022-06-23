import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import { connect } from 'react-redux';

import Layout from '../layouts/HomeLayout';
// TODO: not the right import for this page
import { login } from '../store/utils/thunkCreators';
function Index() {
	return (
		<React.Fragment>
			<Grid container alignItems='center' rowSpacing={{ xs: 4, md: 1 }}>
				<Grid
					container
					item
					xs={12}
					justifyContent='center'
					alignContent='center'
				>
					<Grid item xs={12} sm={10}>
						<Typography
							variant='h3'
							component='h1'
							align='center'
							mt={{ md: 10 }}
							mb={{ md: -2 }}
						>
							Select a scroll, Planeswalker.
						</Typography>
						<br />
						<Typography
							variant='h5'
							component='h2'
							align='center'
							mb={{ md: 10 }}
						>
							<strong>SpellRack</strong> is a deck builder for{' '}
							<strong>Magic: The Gathering</strong>.
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					item
					xs={12}
					justifyContent='center'
					alignContent='center'
				>
					<Grid item xs={12} sm={8} md={6}>
						<TextField
							fullWidth
							placeholder='Search the racks...'
							variant='outlined'
							inputProps={{ 'aria-label': 'search' }}
						></TextField>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

Index.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
// TODO: these aren't the right ones for this page lul
const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (credentials) => {
			dispatch(login(credentials));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
