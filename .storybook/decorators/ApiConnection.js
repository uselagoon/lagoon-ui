import React from 'react';
import { ApolloProvider } from 'react-apollo';

import getConfig from 'next/config';

import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { action } from '@storybook/addon-actions';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';

import { AuthContext } from '../../src/lib/Authenticator';

const publicRuntimeConfig = getConfig();

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// Create a mocked Apollo client for the ApolloProvider.
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: publicRuntimeConfig.GRAPHQL_API }),
  defaultOptions,
});

// Mock the src/lib/Authenticator and lib/withLocalAuth.
const auth = {
  apiToken: 'dummy-value-not-used-but-evals-to-true',
  authenticated: true,
  logout: action('logout'),
  provider: 'local-auth',
  providerData: {},
  user: {
    username: 'Admin',
  },
};

const withMockAuth = Story => {
  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <Story />
        </ApolloHooksProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default withMockAuth;
