'use client';

import { useSession } from 'next-auth/react';
import { useEnvContext } from 'next-runtime-env';

import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { createClient } from 'graphql-ws';

/*
 * reference: https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support
 */

let clientReference: ApolloClient<unknown>;

/*
  makeclient runs once and persists throughout the entire lifecycle of ApolloNextAppProvider.
*/
function makeClient(GRAPHQL_API: string, WEBSOCKET_URI: string, disableSubscriptions: boolean) {
  const httpLink = new HttpLink({
    uri: GRAPHQL_API,
    fetchOptions: { cache: 'no-store' },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });
  const asyncAuthLink = setContext(async (_, { headers }) => {
    const response = await fetch('/api/auth/session'); // same as useSession() in components
    const data = await response.json();

    const authHeader = `Bearer ${data!.access_token}`;

    return {
      headers: {
        ...headers,
        authorization: authHeader,
      },
    };
  });

  const HttpWebsocketLink = () => {
    const wsLink = new GraphQLWsLink(
      createClient({
        url: WEBSOCKET_URI,
        lazy: disableSubscriptions,
        shouldRetry: () => true,
        retryAttempts: 3,
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

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: asyncAuthLink.concat(
      ApolloLink.from([
        errorLink,
        // disable websockets when rendering server side.
        typeof window === 'undefined' ? httpLink : HttpWebsocketLink(),
      ])
    ),
  });

  // save reference for global use. (authLink, unused - unstable)
  clientReference = client;

  return client;
}

export function ApolloClientComponentWrapper({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession();

  const { GRAPHQL_API, disableSubscriptions } = useEnvContext();

  const ws_uri = GRAPHQL_API!.replace(/https/, 'wss').replace(/http/, 'ws');
  const disableSubs = disableSubscriptions?.toLowerCase() === 'true';

  if (status === 'loading' || !session) {
    return null;
  }

  const client = makeClient(GRAPHQL_API!, ws_uri, disableSubs);

  // dynamically updating access_token: https://github.com/apollographql/apollo-client-nextjs/issues/103#issuecomment-1790941212
  client.defaultContext.token = session.access_token;

  return <ApolloNextAppProvider makeClient={() => client}>{children}</ApolloNextAppProvider>;
}
