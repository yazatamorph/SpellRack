import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchUser } from '../store/utils/thunkCreators';

function ReduxWitchery(props) {
	const { children, fetchUser, user } = props;
	const router = useRouter();

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	useEffect(() => {
		console.log('BIG ERRORZ M80', user.error);
	}, [user.error]);
	// TODO: fix what this renders to be a loading dialogue or something
	// if (user.isFetchingUser) {
	// 	return <div>Loading...</div>;
	// }
	useEffect(() => {
		const toRedirect = ['/signin', '/signup'];
		if (user.id && toRedirect.includes(router.pathname)) {
			console.log("I'M FIRIN MAH REDIRECT");
			router.push('/deck');
		}
	}, [user, router]);

	return <React.Fragment>{children}</React.Fragment>;
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchUser() {
			dispatch(fetchUser());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxWitchery);
