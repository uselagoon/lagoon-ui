import React from 'react';

import getConfig from 'next/config';

import Keycloak from 'keycloak-js';
import { queryStringToObject } from 'lib/util';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default (App, initialAuth) => {
  return class withKeycloak extends React.Component {
    static getInitialProps(ctx) {
      return App.getInitialProps(ctx);
    }

    constructor(props) {
      super(props);
      this.state = { auth: initialAuth };
    }

    async componentDidMount() {
      const keycloak = new Keycloak({
        url: publicRuntimeConfig.KEYCLOAK_API,
        realm: 'lagoon',
        clientId: 'lagoon-ui',
      });

      keycloak.onTokenExpired = async () => {
        try {
          await keycloak.updateToken();
          this.setAuth(keycloak);
        } catch (err) {
          console.error('Error refreshing token', err.message);
        }
      };

      try {
        await keycloak.init({
          checkLoginIframe: false,
        });
      } catch (err) {
        console.error('Authentication error', err.message);
      }

      if (!keycloak.authenticated) {
        const urlQuery = queryStringToObject(location.search);
        const options = urlQuery.idpHint
          ? { idpHint: urlQuery.idpHint }
          : { idpHint: publicRuntimeConfig.KEYCLOAK_IDPHINT };

        await keycloak.login(options);
      }

      this.setAuth(keycloak);
    }

    setAuth(keycloak) {
      this.setState({
        auth: {
          apiToken: keycloak.token,
          authenticated: keycloak.authenticated,
          logout: keycloak.logout,
          provider: 'keycloak',
          providerData: keycloak,
          user: {
            username: keycloak.tokenParsed ? keycloak.tokenParsed.email : 'unauthenticated',
          },
        },
      });
    }

    render() {
      return <App {...this.props} auth={this.state.auth} />;
    }
  };
};
