import 'isomorphic-unfetch';
import React from 'react';
import type { AppProps, AppContext } from 'next/app';
import { createUrl } from 'next/app';
import cookie from 'cookie';
import Cookies from 'cookies';
import dayjs from "dayjs";
import type { IncomingMessage, ServerResponse } from 'http';

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
import '../../styles/nprogress.css';
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
            <link rel="stylesheet" href="../../styles/normalize.css" />
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
      clientId: 'lagoon-ui'
    }

    const keycloakInitOptions = {
      checkLoginIframe: false,
      promiseType: 'native',
      // onload:'check-sso',
      // silentCheckSsoRedirectUri:
      //   typeof window !== "undefined"
      //     ? `${window.location.origin}/silent-check-sso.html`
      //     : null,
    }

    return (
      <>
        <Head>
          <link rel="stylesheet" href="../../styles/normalize.css" />
          <Typekit kitId="ggo2pml" />
        </Head>
        <SSRKeycloakProvider
          keycloakConfig={keycloakCfg}
          persistor={SSRCookies(cookies)}
          initOptions={keycloakInitOptions}
          onEvent={async (event, error) => {
            // token access has expired, update refresh token
            if (event === "onTokenExpired") {
              console.log('Token expired - updating');
              // if token expired within 5mins, then refresh
              await getKeycloakInstance(null as any).updateToken(300)
            }

            if (event === "onAuthRefreshSuccess") {
              console.log("Auth token refreshed");
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
    return {};
  } 

  return cookie.parse(req.headers.cookie || '');
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const cookies = new Cookies(ctx?.req, ctx?.res)

  // Re-set kc cookies from server and apply security headers client-side to prevent XSS/CSRF attacks
  if (ctx?.req?.headers) {
    cookies.set('kcToken', cookies.get('kcToken'), {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: 'strict',
      expires: dayjs().add(30, "days").toDate()
    });
  
    cookies.set('kcIdToken', cookies.get('kcIdToken'), {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: 'strict',
      expires: dayjs().add(30, "days").toDate()
    });
  }

  return {
    cookies: parseCookies(ctx?.req),
  }
}

export default MyApp;
