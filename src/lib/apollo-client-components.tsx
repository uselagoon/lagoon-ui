'use client';

import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEnvContext } from 'next-runtime-env';

import { ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, ApolloNextAppProvider, InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { createClient } from 'graphql-ws';

/*
 * reference: https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support
 */

function makeClient(GRAPHQL_API: string, WEBSOCKET_URI: string, disableSubscriptions: boolean, session: Session) {
  const httpLink = new HttpLink({
    uri: GRAPHQL_API,
    fetchOptions: { cache: 'no-store' },
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
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
    link: ApolloLink.from([
      errorLink,
      // Disable websockets when rendering server side.
      typeof window === 'undefined' ? httpLink : HttpWebsocketLink(),
    ]),
  });
}

export function ApolloClientComponentWrapper({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession();

  const { GRAPHQL_API, disableSubscriptions } = useEnvContext();

  const ws_uri = GRAPHQL_API!.replace(/https/, 'wss').replace(/http/, 'ws');
  const disableSubs = disableSubscriptions?.toLowerCase() === 'true';

  if (status === 'loading' || !session) {
    return null;
  }

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(GRAPHQL_API!, ws_uri, disableSubs, session)}>
      {children}
    </ApolloNextAppProvider>
  );
}
