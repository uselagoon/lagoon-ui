import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-loading-skeleton/dist/skeleton.css';
import Typekit from 'react-typekit';

import App from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Favicon from 'components/Favicon';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import 'isomorphic-unfetch';
import ApiConnection from 'lib/ApiConnection';
import Authenticator from 'lib/Authenticator';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { initI18n } from '../i18n/i18n';
import '../static/normalize.css';
import Tour from '../tours/Tour';
import { TourContextProvider } from '../tours/TourContext';

initI18n();

const { LAGOON_UI_TOURS_ENABLED } = getConfig().publicRuntimeConfig;
const tourEnabled = LAGOON_UI_TOURS_ENABLED === 'enabled';

// lazy load animation features
const loadFeatures = () => import('components/common/features').then(res => res.default);

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname, events } = useRouter();
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
      <>
        <Head>
          <Typekit kitId="ggo2pml" />
        </Head>
        <Component {...pageProps} errorMessage={err.toString()} url={pathname} />
        <Favicon />
      </>
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
      </AnimatePresence>
    </LazyMotion>
  );
};

LagoonApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default LagoonApp;
