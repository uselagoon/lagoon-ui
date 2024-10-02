import NextAuth, { Account } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import 'next-auth/jwt';
import Keycloak from 'next-auth/providers/keycloak';

async function refreshAccessToken(token: JWT) {
  const reqUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

  const response = await fetch(reqUrl, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: process.env.AUTH_KEYCLOAK_ID!,
      client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token!,
    }),
  });

  const refreshToken = await response.json();
  if (!response.ok) throw refreshToken;

  const newTokens = refreshToken as {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  };
  token.access_token = newTokens.access_token;
  token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);
  // Some providers only issue refresh tokens once, so preserve if we did not get a new one
  if (newTokens.refresh_token) token.refresh_token = newTokens.refresh_token;

  return token;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Keycloak({
      issuer: process.env.AUTH_KEYCLOAK_ISSUER,
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async authorized({ auth }) {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    async jwt({ token, account }: { token: JWT; account: Account | null }): Promise<JWT> {
      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        return {
          ...token,
          access_token: account.access_token as string,
          expires_at: account.expires_at as number,
          refresh_token: account.refresh_token,
          id_token: account.id_token as string,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // access token still valid
        return token;
      } else {
        if (!token.refresh_token) throw new TypeError('Missing refresh_token');

        try {
          return await refreshAccessToken(token);
        } catch (error) {
          console.error('Error refreshing access_token', error);
          //if we fail to refresh the token, return an error so we can handle it on the page

          token.error = 'RefreshTokenError';
          return token;
        }
      }
    },
    async session({ session, token }) {
      // send properties to the client

      session.access_token = token.access_token;
      session.id_token = token.id_token;
      session.roles = token?.realm_access?.roles;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: '/api/login',
    signOut: '/api/logout',
    error: '/api/errRedirect',
  },
  trustHost: true,
});

declare module 'next-auth' {
  interface Session {
    access_token: string;
    id_token: string;
    error?: 'RefreshTokenError';
    roles?: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    id_token: string;
    expires_at: number;
    refresh_token?: string;
    realm_access?: {
      roles?: string[];
    };
    error?: 'RefreshTokenError';
  }
}
