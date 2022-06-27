import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

import Layout from '../../layouts/DefaultLayout';
import AllDecks from '../../components/AllDecks';
import { fetchAllDecks, fetchUserDecks } from '../../store/utils/thunkCreators';

function UserDecks(props) {
	const router = useRouter();
	const { username } = router.query;
	const { fetchAllDecks, fetchUserDecks } = props;

	useEffect(() => {
		if (router.isReady) {
			if (username === 'all') {
				(async () => await fetchAllDecks())();
			} else {
				(async () => await fetchUserDecks(username))();
			}
		}
	}, [router, fetchAllDecks, fetchUserDecks, username]);

	return (
		<React.Fragment>
			<AllDecks owner={username} />
		</React.Fragment>
	);
}

UserDecks.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};

const mapStateToProps = (state) => {
	return {
		decks: state.deck.all,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllDecks: () => {
			dispatch(fetchAllDecks());
		},
		fetchUserDecks: (param) => {
			dispatch(fetchUserDecks(param));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDecks);
