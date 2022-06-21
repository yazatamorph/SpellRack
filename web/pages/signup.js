import React from 'react';
import {
	Avatar,
	Box,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import Layout from '../layouts/AuthLayout';
import Link from '../components/Link';

export default function SignUp() {
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	return (
		<Grid container component='main' sx={{ display: 'flex', flexGrow: 1 }}>
			<Grid item xs={false} sm={4} md={7}>
				<Box
					sx={{
						my: 8,
						mx: 4,
						p: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box alignItems='left'>
						<Typography gutterBottom variant='h4'>
							This will be information about SpellRack.
						</Typography>
						<Typography variant='body1'>So many benefits!</Typography>
						<Typography variant='body1'>Like this one.</Typography>
						<Typography variant='body1'>Also this one.</Typography>
						<Typography variant='body1'>
							You should definitely sign up.
						</Typography>
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12} sm={8} md={5}>
				<Box
					component={Paper}
					sx={{
						my: 8,
						mx: 4,
						p: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1 }}>
						<LockOutlined />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box
						component='form'
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='given-name'
									name='firstName'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
								/>
							</Grid>
							<Grid item xs={12}></Grid>
						</Grid>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='#' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

SignUp.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
