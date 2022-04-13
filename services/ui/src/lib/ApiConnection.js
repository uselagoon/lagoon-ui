import React from 'react';
import getConfig from 'next/config';
import {
  ApolloClient,
  ApolloProvider as ApolloHooksProvider,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
  from
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error"
import { getMainDefinition } from '@apollo/client/utilities';
import { AuthContext } from 'lib/KeycloakProvider';


// WebSocketLink Deprecated: https://www.apollographql.com/docs/react/api/link/apollo-link-ws/
//import { WebSocketLink } from '@apollo/client/link/ws';

// Recommmended to now use the newer graphql-ws library with the accompanying GraphQLWsLink.
////
// Subscription library change
// @TODO: We need to update the api to use this library server-side also
////


const { publicRuntimeConfig } = getConfig();

const ApiConnection = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {auth => {
        if (!auth.authenticated) {
          return;
        }

        const httpLink = new HttpLink({
          uri: publicRuntimeConfig.GRAPHQL_API,
          headers: {
            authorization: `Bearer ${auth.apiToken}`
          }
        });

        const wsLink = new GraphQLWsLink(createClient({
          url: publicRuntimeConfig.GRAPHQL_API.replace(/https/, 'wss').replace(/http/,'ws'),
          connectionParams: {
            authToken: auth.authenticated && auth.apiToken
          },
        }));

        const splitLink = split(({query})=>{
          const definition =  getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription' 
          );
        }, wsLink, httpLink);


        const authLink = setContext((_, { headers }) => {
          return {
            headers: {
              ...headers,
              authorization: auth.authenticated ? `Bearer ${auth.apiToken}` : "",
            }
          }
        });

        const errorLink = onError(({graphQLErrors, networkError}) => {
          if (graphQLErrors) {
            graphQLErrors.forEach(({message, locations, path}) => console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            )
          }
          if (networkError) {
            console.log('[NetworkError]', networkError)
          } 
        });

        const client = new ApolloClient({
          // link: authLink.concat(splitLink),
          link: from([authLink, errorLink, splitLink]),
          cache: new InMemoryCache(),
          defaultOptions: {
            watchQuery: {
              errorPolicy: "ignore",
              fetchPolicy: 'cache-and-network',
            },
            query: {
              errorPolicy: "all",
              fetchPolicy: "network-only",
            },
            mutate: {
              errorPolicy: "all",
            },
          },
        });

        // const client = new ApolloClient({
        //   link: ApolloLink.from([
        //     onError(({ graphQLErrors, networkError }) => {
        //       if (graphQLErrors)
        //         graphQLErrors.map(({ message, locations, path }) =>
        //           console.log(
        //             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //           )
        //         );
        //       if (networkError) console.log('[Network error]', networkError);
        //     }),
        //     // Disable websockets when rendering server side.
        //     process.browser ? HttpWebsocketLink() : httpLink
        //   ]),
        //   cache: new InMemoryCache(),
        //   defaultOptions: {
        //     watchQuery: {
        //       errorPolicy: "all",
        //       fetchPolicy: "network-only",
        //     },
        //     query: {
        //       errorPolicy: "all",
        //       fetchPolicy: "network-only",
        //     },
        //     mutate: {
        //       errorPolicy: "all",
        //     },
        //   },
        // });

        return <ApolloProvider client={client}><ApolloHooksProvider client={client}>{children}</ApolloHooksProvider></ApolloProvider>;
      }}
    </AuthContext.Consumer>
  )
};

export default ApiConnection;
