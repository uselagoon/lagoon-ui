import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

import { auth } from '../auth';

export const { getClient } = registerApolloClient(async () => {
  const session = await auth();

  const httpLink = new HttpLink({
    uri: 'http://0.0.0.0:33000/graphql',
    headers: {
      authorization: `Bearer ${session?.access_token}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
});
