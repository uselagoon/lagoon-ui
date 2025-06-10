import React, { useContext, useMemo } from 'react';

import getConfig from 'next/config';

import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';
import { AuthContext } from 'lib/Authenticator';
import ErrorPage from 'pages/_error';

const { publicRuntimeConfig } = getConfig();
const isServer = typeof window === 'undefined';

const ApiConnection = ({ children }) => {
  const auth = useContext(AuthContext);

  const client = useMemo(() => {
    if (!auth.authenticated || !auth.apiToken) {
      return null;
    }

    const httpLink = createUploadLink({
      uri: publicRuntimeConfig.GRAPHQL_API,
      headers: {
        authorization: `Bearer ${auth.apiToken}`,
      },
    });

    if (isServer) {
      return new ApolloClient({
        link: httpLink,
        cache: new InMemoryCache(),
        ssrMode: true,
      });
    }

    const wsUrl = publicRuntimeConfig.GRAPHQL_API.replace(/^http/, 'ws');
    console.log(`Setting up WebSocket connection to: ${wsUrl}`);

    const wsLink = new GraphQLWsLink(
      createClient({
        url: wsUrl,
        connectionParams: {
          authToken: auth.apiToken,
        },
        shouldRetry: () => true,
        on: {
          error: err => console.error('[ws client error]', err),
          closed: event => console.log('[ws client closed]', event),
        },
      })
    );

    const splitLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      if (networkError) console.error(`[Network error]: ${networkError}`);
    });

    return new ApolloClient({
      link: ApolloLink.from([errorLink, splitLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: { fetchPolicy: 'cache-and-network' },
      },
    });
  }, [auth.authenticated, auth.apiToken]);

  if (!client) {
    return <ErrorPage statusCode={401} title="Login Required" errorMessage="Authenticating..." />;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApiConnection;
