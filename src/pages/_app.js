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
import GlobalStyles from "../layouts/GlobalStyles";

import { initI18n } from "../i18n/i18n";
import { useTranslation } from "react-i18next";


initI18n();

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname } = useRouter();

   const {i18n} = useTranslation();
   void i18n.changeLanguage("italian");
  // Catch runtime errors in production and skip authentication to avoid
  // infinite auth > error > auth > error loops.
  if (err) {
    return (
      <>
        <Head>
          <Typekit kitId="ggo2pml" />
        </Head>
        <Component
          {...pageProps}
          errorMessage={err.toString()}
          url={pathname}
        />
        <Favicon />
      </>
    );
  }

  return (
    <>
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
    </>
  );
};

LagoonApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default LagoonApp;
