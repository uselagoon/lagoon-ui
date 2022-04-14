import React from 'react';
import getConfig from 'next/config';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
  HttpLink,
  createHttpLink,
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
        const getAuthorizationHeader = () => {
          return {
            "Access-Control-Allow-Origin": "*",
            authorization: auth.authenticated ? `Bearer ${auth.apiToken}` : "",
          };
        }
        
        const authLink = setContext((_, { headers }) => {
          return {
            headers: {
              ...headers,
              ...getAuthorizationHeader(),
            }
          }
        });

        const httpLink = new HttpLink({
          uri: publicRuntimeConfig.GRAPHQL_API,
          headers: {
            ...getAuthorizationHeader(),
          }
        });

        const wsLink = new GraphQLWsLink(createClient({
          url: publicRuntimeConfig.GRAPHQL_API.replace(/https/, 'wss').replace(/http/,'ws'),
          connectionParams: {
            authToken: auth.authenticated && auth.apiToken
          },
        }));

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

        const splitLink = split(({query})=>{
          const definition =  getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription' 
          );
        }, wsLink, httpLink);


        const client = new ApolloClient({
          ssrMode: typeof window === "undefined",
          link: from([authLink, errorLink, splitLink, createHttpLink({
            uri: publicRuntimeConfig.GRAPHQL_API,
            credentials: 'same-origin',
            headers: {
              authorization: auth.authenticated ? `Bearer ${auth.apiToken}` : "",
            },
          })]),
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

        return <ApolloProvider client={client}>{children}</ApolloProvider>;
      }}
    </AuthContext.Consumer>
  )
};

export default ApiConnection;
