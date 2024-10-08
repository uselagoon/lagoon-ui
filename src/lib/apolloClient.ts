import { env } from 'next-runtime-env';

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
// subscsriptions
import { createClient } from 'graphql-ws';

import { auth } from '../auth';

export const { getClient } = registerApolloClient(async () => {
  const session = await auth();

  const GRAPHQL_API = env('GRAPHQL_API');
  const WEBSOCKET_URI = env('GRAPHQL_API')!.replace(/https/, 'wss').replace(/http/, 'ws');

  const disableSubscriptions = env('DISABLE_SUBSCRIPTIONS')?.toLowerCase() === 'true';

  const httpLink = new HttpLink({
    uri: GRAPHQL_API,
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
  });

  const HttpWebsocketLink = () => {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: WEBSOCKET_URI,
        connectionParams: () => {
          if (!session) {
            return {};
          }
          return {
            Authorization: `Bearer ${session?.access_token}`,
          };
        },
        lazy: disableSubscriptions,
        shouldRetry: () => true,
      })
    );

    return ApolloLink.split(
      ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    );
  };
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations)}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.log('[Network error]', networkError);
    }
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    // link: httpLink,
    link: ApolloLink.from([
      errorLink,
      // Disable websockets when rendering server side.
      typeof window === 'undefined' ? httpLink : HttpWebsocketLink(),
    ]),
  });
});
