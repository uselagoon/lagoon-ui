import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import App from 'next/app';

import { queryStringToObject } from 'lib/util';

const withKeycloak = (App, initialAuth) => (props) => {
    const { keycloak, initialized } = useKeycloak();
    const { login = () => {}, authenticated } = keycloak || {};

    const [auth, setAuth] = useState(initialAuth);

    const updateAuth = (keycloak) => {
      setAuth(
        {
          ...keycloak, 
          apiToken: keycloak.token,
          authenticated: keycloak.authenticated,
          logout: keycloak.logout,
          provider: 'keycloak',
          user: {
            username: keycloak.tokenParsed ? keycloak.tokenParsed.preferred_username : 'unauthenticated',
          }
        }
      );
    }

    useEffect(async () => {
      if (!initialized) {
        return;
      }

      if (!authenticated) {
        const urlQuery = queryStringToObject(location.search);
        const options = urlQuery.idpHint ? { idpHint: urlQuery.idpHint } : {};

        login(options);
      }

      updateAuth(keycloak);
    }, [login, authenticated, initialized]);


    // useEffect(() => {
    //   if(!initialized){
    //     return;
    //   }

    //   if(authenticated){
    //     Router.replace('/projects');
    //   }
    // })

    return initialized && keycloak.authenticated && <App {...props} auth={auth} />
};

withKeycloak.getInitialProps = ({ ctx }) => {
  return App.getInitialProps(ctx);
}

export default withKeycloak;