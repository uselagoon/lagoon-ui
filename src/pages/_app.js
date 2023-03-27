import "isomorphic-unfetch";
import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import Typekit from "react-typekit";
import Favicon from "components/Favicon";
import Authenticator, { AuthContext } from "lib/Authenticator";
import ApiConnection from "lib/ApiConnection";
import Script from "next/script";
import App from "next/app";

// theming
import useTheme from "lib/useTheme";
import {darkTheme,lightTheme} from "../styles/theme";
import { ThemeProvider } from "styled-components";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname } = useRouter();
  const { theme } = useTheme();
  const lagoonTheme = theme === "light" ? lightTheme : darkTheme;

  // Catch runtime errors in production and skip authentication to avoid
  // infinite auth > error > auth > error loops.
  if (err) {
    return (
      <ThemeProvider theme={lagoonTheme}>
        <Head>
          <Typekit kitId="ggo2pml" />
        </Head>
        <Component
          {...pageProps}
          errorMessage={err.toString()}
          url={pathname}
        />
        <Favicon />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={lagoonTheme}>
      <Script
        src={`${publicRuntimeConfig.KEYCLOAK_API}/js/keycloak.js`}
        strategy="beforeInteractive"
      />
      <Head>
        <Typekit kitId="ggo2pml" />
      </Head>
      <Authenticator>
        <ApiConnection>
          <Component {...pageProps} url={pathname} />
        </ApiConnection>
      </Authenticator>
      <Favicon />
    </ThemeProvider>
  );
};

LagoonApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default LagoonApp;
