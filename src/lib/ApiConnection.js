import React from 'react';
// import { ApolloProvider } from 'react-apollo';

import getConfig from 'next/config';

import { AuthContext } from 'lib/Authenticator';
import ErrorPage from 'pages/_error.js';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, split, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const disableSubscriptions = publicRuntimeConfig.DISABLE_SUBSCRIPTIONS?.toLowerCase() === 'true';

const ApiConnection = ({ children }) => (
  <AuthContext.Consumer>
    {auth => {
      if (!auth.authenticated) {
        return <ErrorPage statusCode={401} title="Login Required" errorMessage="Please wait while we log you in..." />;
      }

      const httpLink = new HttpLink({
        uri: publicRuntimeConfig.GRAPHQL_API,
        headers: {
          authorization: `Bearer ${auth.apiToken}`,
        },
      });

      const HttpWebsocketLink = () => {
        const wsLink = new GraphQLWsLink(createClient({
          url: publicRuntimeConfig.GRAPHQL_API.replace(/https/, 'wss').replace(/http/, 'ws'),
          options: {
            lazy: disableSubscriptions,
            connectionParams: {
              authToken: auth.apiToken,
            },
          },
        }));
        return split(
          ({ query }) => {
            const { kind, operation } = getMainDefinition(query);
            return kind === 'OperationDefinition' && operation === 'subscription';
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
                  `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`
                )
              );
            if (networkError) console.log('[Network error]', networkError);
          }),
          // Disable websockets when rendering server side.
          typeof window !== 'undefined' ? HttpWebsocketLink() : httpLink,
        ]),
        cache: new InMemoryCache(),
      });

      return (
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      );
    }}
  </AuthContext.Consumer>
);

export default ApiConnection;
