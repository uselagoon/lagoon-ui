import 'isomorphic-unfetch';
import React, { useState} from 'react';
import type { AppProps, AppContext } from 'next/app';
import cookie from 'cookie';
import nookies, { setCookie } from 'nookies';
import dayjs from "dayjs";
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
import '../../styles/nprogress.css';
import 'components/Honeycomb/styling.css';

interface AppPropsWithCookies extends AppProps {
  cookies: any,
  err: any
}

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());

export const isServer = () => typeof window !== "undefined";

const MyApp = ({ Component, pageProps, router, cookies, err }: AppPropsWithCookies) => {
  const url = router.pathname;
  const { publicRuntimeConfig } = getConfig();

  const [refreshToken, setRefreshToken] = useState(null);

  // Catch runtime errors in production and skip authentication to avoid
  // infinite auth > error > auth > error loops.
  if (err) {
    return (
      <>
        <Head>
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
    checkLoginIframe: true,
    onload:'check-sso',
    silentCheckSsoRedirectUri:
      typeof window !== "undefined"
        ? `${window.location.origin}/silent-check-sso.html`
        : null,
  }

  const refreshTokenUpdated = (token) => {
    if (token && typeof window === "undefined") {
      setCookie(null, "kcToken", token, {
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
        sameSite: 'strict',
        expires: dayjs().add(1, "days").toDate()
      });
    }

    // Currently no way to refresh tokens server-side
    setRefreshToken(getKeycloakInstance(null as any).token)
  }

  return (
    <>
      <Head>
        <Typekit kitId="ggo2pml" />
      </Head>
      <SSRKeycloakProvider
        keycloakConfig={keycloakCfg}
        persistor={SSRCookies(cookies)}
        initOptions={keycloakInitOptions}
        onEvent={async (event, error) => {
          if (error) {
            console.log(error)
          }
          // Token access has expired, update refresh token
          if (event === "onTokenExpired") {
            if (isServer()) {
              console.log('Token expired - updating');
            }

            // Set refresh token to be less than server access token lifespan of 5mins
            await getKeycloakInstance(null as any).updateToken(240).then((refreshed) => {
              if (refreshed) {
                console.log('Token was successfully refreshed');
              } else {
                console.log('Token is still valid - no refresh needed');
              }
            }).catch(() => console.log("Failed to refresh token"));
          }

          if (event === "onAuthRefreshSuccess") {
            if (isServer()) {
              console.log("Auth token refreshed");
            }

            refreshTokenUpdated(getKeycloakInstance(null as any).token)
          }
        }}
      >
        <KeycloakProvider refreshToken={refreshToken}>
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
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async ({ ctx }: AppContext) => {
  const { kcToken, kcIdToken } = parseCookies(ctx?.req) || '';

  if (kcToken && typeof window === "undefined") {
    // Re-set kc cookies on server and apply security headers to prevent XSS/CSRF attacks
    nookies.set(ctx, 'kcToken', kcToken, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: 'strict',
      expires: dayjs().add(1, "days").toDate()
    });
  }

  if (kcIdToken && typeof window === "undefined") {
    nookies.set(ctx, 'kcIdToken', kcIdToken, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: 'strict',
      expires: dayjs().add(1, "days").toDate()
    });
  }

  return {
    cookies: { kcToken, kcIdToken }
  }
}

export default MyApp;