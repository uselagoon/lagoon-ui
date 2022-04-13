import React, { Component } from 'react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const withLocalAuth = (App) => {
  return class withLocalAuth extends Component {
    static getInitialProps(ctx) {
      return App.getInitialProps(ctx);
    }

    render() {
      return (
        <App
          {...this.props}
          auth={{
            apiToken: publicRuntimeConfig.GRAPHQL_API_TOKEN,
            authenticated: true,
            logout: () => {},
            provider: 'local-auth',
            user: {
              username: 'localadmin'
            }
          }}
        />
      );
    }
  };
};