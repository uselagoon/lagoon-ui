import { NextAuthOptions } from "next-auth";
import keycloakProvider from "next-auth/providers/keycloak"

import { jwtDecode } from "jwt-decode";
import { encrypt } from "../../utils/encrypt";

// TODO: set this up properly
async function refreshAccessToken(token) {
    const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: "lagoon-testing",
        client_secret: "oiYKfvRwHj8BJm3k5kcMWFjNn79w6Se0",
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });
    const refreshToken = await resp.json();
    if (!resp.ok) throw refreshToken;
  
    return {
      ...token,
      access_token: refreshToken.access_token,
      decoded: jwtDecode(refreshToken.access_token),
      id_token: refreshToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken.refresh_token,
    };
  }

export const authOptions: NextAuthOptions = {
    providers:[
        keycloakProvider({
            issuer:"http://0.0.0.0:38088/auth/realms/lagoon",
            clientId:"lagoon-testing",
            clientSecret:"oiYKfvRwHj8BJm3k5kcMWFjNn79w6Se0",
        })

    ],
    callbacks: {
        async jwt({ token, account }) {
          const nowTimeStamp = Math.floor(Date.now() / 1000);
    
          if (account) {
            // account is only available the first time this callback is called on a new session (after the user signs in)
            token.decoded = jwtDecode(account.access_token);
            token.access_token = account.access_token;
            token.id_token = account.id_token;
            token.expires_at = account.expires_at;
            token.refresh_token = account.refresh_token;
            return token;
          } else if (Number(nowTimeStamp) < Number(token.expires_at)) {
            // token has not expired yet, return it
            return token;
          } else {
            // refresh token
            try {
              const refreshedToken = await refreshAccessToken(token);
              console.log("Token is refreshed.")
              return refreshedToken;
            } catch (error) {
              console.error("Error refreshing access token", error);
              return { ...token, error: "RefreshAccessTokenError" };
            }
          }
        },
        async session({ session, token }) {
            console.log(token)
          // Send properties to the client
          //@ts-ignore
          session.access_token = encrypt(token.access_token);
                    //@ts-ignore
          session.id_token = encrypt(token.id_token); 
                    //@ts-ignore
          session.roles = token.decoded.realm_access.roles;
                    //@ts-ignore
          session.error = token.error;      
          return session;
        },
      },
}