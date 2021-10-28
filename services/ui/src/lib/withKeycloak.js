import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import StatusLayout from 'layouts/StatusLayout';
import App from 'next/app';
import Cookies from "js-cookie";
import { queryStringToObject } from 'lib/util';

const withKeycloak = (App, initialAuth) => (props) => {
  const { keycloak, initialized } = useKeycloak();
  const { login = () => {}, authenticated,  } = keycloak || {};

  const [auth, setAuth] = useState(initialAuth);

  const logoutClearCookies = () => {
    if (initialized && typeof window !== "undefined") {
      Cookies.remove('kcToken');
      Cookies.remove('kcIdToken');

      keycloak?.logout({
        redirectUri: window.location.origin + '/projects',
      });
    }
  }

  const updateAuth = (keycloak) => {
    setAuth(
      {
        ...keycloak,
        apiToken: keycloak.token,
        authenticated: keycloak.authenticated,
        logout: (() => logoutClearCookies()),
        provider: 'keycloak',
        user: {
          username: keycloak.tokenParsed ? keycloak.tokenParsed.preferred_username : 'unauthenticated',
        }
      }
    );
  }

  useEffect(() => {
    if (!initialized) return;

    if (!authenticated) {
      const urlQuery = queryStringToObject(location.search);
      const options = urlQuery.idpHint ? {idpHint: urlQuery.idpHint} : {};

      login(options);
    }

    updateAuth(keycloak);
  }, [login, authenticated, initialized]);

  if (initialized && typeof window !== "undefined") {
    return keycloak.authenticated && <App {...props} auth={auth} />
  }
  else {
    return <>
      <StatusLayout>
        <h1 suppressHydrationWarning>Authenticating...</h1>
      </StatusLayout>
    </>
  }
};

export default withKeycloak;
