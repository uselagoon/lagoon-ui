import 'isomorphic-unfetch';
import React from 'react';
import type { AppProps, AppContext } from 'next/app';
import { createUrl } from 'next/app';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';

import getConfig from 'next/config';
import Router from 'next/router';
import Head from 'next/head';

import { SSRKeycloakProvider, SSRCookies, getKeycloakInstance } from '@react-keycloak/ssr';
import Favicon from 'components/Favicon';
import ApiConnection from 'lib/ApiConnection';
import KeycloakProvider from 'lib/KeycloakProvider';

import NProgress from 'nprogress';
import Typekit from 'react-typekit';
import 'semantic-ui-css/semantic.min.css';
import '../../public/nprogress.css';
import 'components/Honeycomb/styling.css';

 
interface AppPropsWithCookies extends AppProps {
  cookies: unknown,
  err: any
}

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, router, cookies, err }: AppPropsWithCookies) => {
    const url = createUrl(router);
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

    // Catch runtime errors in production and skip authentication to avoid
    // infinite auth > error > auth > error loops.
    if (err) {
      return (
        <>
          <Head>
            <link rel="stylesheet" href="/normalize.css" />
            <Typekit kitId="ggo2pml" />
          </Head>
          <Component {...pageProps} errorMessage={err.toString()} url={url} />
          <Favicon />
        </>
      );
    }

    const keycloakCfg = {
      url: publicRuntimeConfig.KEYCLOAK_API,
      realm: 'lagoon',
      clientId: 'lagoon-ui',
      // onLoad: 'login-required'
    }

    const keycloakInitOptions = {
      checkLoginIframe: false,
      promiseType: 'native',
    }

    return (
      <>
        <Head>
          <link rel="stylesheet" href="/normalize.css" />
          <Typekit kitId="ggo2pml" />
        </Head>
        <SSRKeycloakProvider
          keycloakConfig={keycloakCfg}
          persistor={SSRCookies(cookies)}
          initOptions={keycloakInitOptions}
          onEvent={async (event, error) => {
            if (event === "onTokenExpired") {
              console.log('onTokenExpired')
              await getKeycloakInstance(null as any).updateToken(30)
            }
          }}
        >
          <KeycloakProvider>
            <ApiConnection>
              <Component {...pageProps} url={url} />
            </ApiConnection>
          </KeycloakProvider>
        </SSRKeycloakProvider>
        <Favicon />
      </>
    );
}

const parseCookies = (req?: IncomingMessage) => {
  if (!req || !req.headers) {
    return {}
  } 

  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default MyApp;
