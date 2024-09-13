import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth";
import { decrypt } from "../../utils/encrypt";


export const { getClient } =  registerApolloClient(async () => {
    const session = await getServerSession(authOptions);

    console.warn(session)

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://0.0.0.0:33000/graphql",
      headers: {
        authorization: `Bearer ${decrypt(session?.access_token)}`,
      },
    }),
  });
});