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

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname } = useRouter();

  console.warn(publicRuntimeConfig);
  // Catch runtime errors in production and skip authentication to avoid
  // infinite auth > error > auth > error loops.
  if (err) {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="/static/normalize.css" />
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
        <link rel="stylesheet" href="/static/normalize.css" />
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

export default LagoonApp;
