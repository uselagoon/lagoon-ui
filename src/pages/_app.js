import React, { createContext, useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import Typekit from 'react-typekit';

import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Favicon from 'components/Favicon';
// transitions
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import 'isomorphic-unfetch';
import ApiConnection from 'lib/ApiConnection';
import Authenticator from 'lib/Authenticator';
// theming
import useTheme from 'lib/useTheme';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ThemeProvider } from 'styled-components';

//localization
import { initI18n } from '../i18n/i18n';
import '../static/normalize.css';
import { darkTheme, lightTheme } from '../styles/theme';
import Tour from '../tours/Tour';
// tours
import { TourContextProvider } from '../tours/TourContext';

initI18n();

const { LAGOON_UI_TOURS_ENABLED } = getConfig().publicRuntimeConfig;
const tourEnabled = LAGOON_UI_TOURS_ENABLED === 'enabled';

// lazy load animation features
const loadFeatures = () => import('components/common/features').then(res => res.default);

export const AppContext = createContext(null);

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname, events } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const lagoonTheme = theme === 'light' ? lightTheme : darkTheme;
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const startTransition = () => {
      NProgress.start();
    };
    const endTransition = () => {
      NProgress.done();
    };

    events.on('routeChangeStart', startTransition);
    events.on('routeChangeComplete', endTransition);
    events.on('routeChangeError', endTransition);

    return () => {
      events.off('routeChangeStart', startTransition);
      events.off('routeChangeComplete', endTransition);
    };
  }, [events]);

  // Catch runtime errors in production and skip authentication to avoid
  // infinite auth > error > auth > error loops.
  if (err) {
    return (
      <ThemeProvider theme={lagoonTheme}>
        <Head>
          <Typekit kitId="ggo2pml" />
        </Head>
        <Component {...pageProps} errorMessage={err.toString()} url={pathname} />
        <Favicon />
      </ThemeProvider>
    );
  }

  return (
    <LazyMotion strict features={loadFeatures}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto',
          });
        }}
      >
        <AppContext.Provider value={{ theme, toggleTheme }}>
          <ThemeProvider theme={lagoonTheme}>
            <Authenticator>
              <ApiConnection>
                <TourContextProvider>
                  <m.div
                    className="lagoon-wrapper"
                    key={pathname}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 1, transition: { duration: 0.5 } }}
                    exit={{ opacity: 0.65, transition: { duration: 0.5 } }}
                  >
                    <Head>
                      <Typekit kitId="ggo2pml" />
                    </Head>
                    <Component {...pageProps} url={pathname} />
                    {tourEnabled ? <Tour /> : null}
                    <Favicon />
                  </m.div>
                </TourContextProvider>
              </ApiConnection>
            </Authenticator>
          </ThemeProvider>
        </AppContext.Provider>
      </AnimatePresence>
    </LazyMotion>
  );
};

LagoonApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default LagoonApp;
