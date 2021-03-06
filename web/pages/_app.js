import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
// Redux store
import store from '../store';
// Global css overriding CssBaseLine?
import '../styles/globals.css';
import ReduxWitchery from '../components/ReduxWitchery';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<ReduxProvider store={store}>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name='viewport' content='initial-scale=1, width=device-width' />
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<ReduxWitchery>
						{getLayout(<Component {...pageProps} />)}
					</ReduxWitchery>
				</ThemeProvider>
			</CacheProvider>
		</ReduxProvider>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};
