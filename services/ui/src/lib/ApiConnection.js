import React from 'react';
import getConfig from 'next/config';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { ApolloLink, HttpLink } from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/link-error';
import { getMainDefinition } from '@apollo/client/utilities';

import { AuthContext } from 'lib/Authenticator';
import ErrorPage from 'pages/_error.js';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const ApiConnection = ({ children }) => (
  <AuthContext.Consumer>
    {auth => {
      if (!auth.authenticated) {
        return (
          <ErrorPage
            statusCode={401}
            errorMessage="Please wait while we log you in..."
          />
        );
      }

      const httpLink = new HttpLink({
        uri: publicRuntimeConfig.GRAPHQL_API,
        headers: {
          authorization: `Bearer ${auth.apiToken}`
        }
      });

      const HttpWebsocketLink = () => {
        const wsLink = new WebSocketLink({
          uri: publicRuntimeConfig.GRAPHQL_API.replace(/https/, 'wss').replace(
            /http/,
            'ws'
          ),
          options: {
            reconnect: true,
            connectionParams: {
              authToken: auth.apiToken
            }
          }
        });

        return ApolloLink.split(
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          wsLink,
          httpLink
        );
      };

      const client = new ApolloClient({
        link: ApolloLink.from([
          onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
              graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
              );
            if (networkError) console.log('[Network error]', networkError);
          }),
          // Disable websockets when rendering server side.
          process.browser ? HttpWebsocketLink() : httpLink
        ]),
        cache: new InMemoryCache()
      });

      return <ApolloProvider client={client}><ApolloHooksProvider client={client}>{children}</ApolloHooksProvider></ApolloProvider>;
    }}
  </AuthContext.Consumer>
);

export default ApiConnection;
