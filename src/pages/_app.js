import "isomorphic-unfetch";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import getConfig from "next/config";
import Typekit from "react-typekit";
import Favicon from "components/Favicon";
import Authenticator, { AuthContext } from "lib/Authenticator";
import ApiConnection from "lib/ApiConnection";
import Script from "next/script";
import App from "next/app";
import GlobalStyles from "../layouts/GlobalStyles";
import { TourContextProvider } from "../tours/TourContext";
import { m, AnimatePresence, LazyMotion } from "framer-motion";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// lazy load animation features
const loadFeatures = () =>
  import("components/common/features").then((res) => res.default);

const LagoonApp = ({ Component, pageProps, err }) => {
  const { pathname, asPath, events } = useRouter();

  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const startTransition = () => {
      NProgress.start();
      console.warn("transition");
    };
    const endTransition = () => {
      NProgress.done();
    };

    events.on("routeChangeStart", startTransition);
    events.on("routeChangeComplete", endTransition);
    events.on("routeChangeError", endTransition);

    return () => {
      events.off("routeChangeStart", startTransition);
      events.off("routeChangeComplete", endTransition);
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
    <LazyMotion strict features={loadFeatures}>
      <Script
        src={`${publicRuntimeConfig.KEYCLOAK_API}/js/keycloak.js`}
        strategy="beforeInteractive"
      />
      <Authenticator>
        <ApiConnection>
          <AnimatePresence
            mode="wait"
            onExitComplete={() => {
              console.error("REMOUNTED");
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
              });
            }}
          >
            <m.div
              style={{
                background: "rgb(250,250,252)",
              }}
              key={pathname}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0.55, transition: { duration: 0.5 } }}
            >
              <Head>
                <Typekit kitId="ggo2pml" />
              </Head>

              <GlobalStyles />
              <TourContextProvider>
                <Component {...pageProps} url={pathname} />
              </TourContextProvider>

              <Favicon />
            </m.div>
          </AnimatePresence>
        </ApiConnection>
      </Authenticator>
    </LazyMotion>
  );
};

LagoonApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default LagoonApp;
