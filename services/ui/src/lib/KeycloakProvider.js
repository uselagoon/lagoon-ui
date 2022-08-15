import { createContext, useContext } from 'react';
import getConfig from 'next/config';
import withKeycloak from 'lib/withKeycloak';
import withLocalAuth from 'lib/withLocalAuth';

const { publicRuntimeConfig } = getConfig();

const initialAuth = {
  authenticated: false
};

export const AuthContext = createContext(initialAuth);

export function KeycloakProvider({ children, auth, refreshToken }) {
  const updatedAuth = refreshToken
    ? { ...auth, apiToken: refreshToken }
    : auth;

  return (
    <AuthContext.Provider value={updatedAuth}>
      {children}
    </AuthContext.Provider>
  );
}

export default publicRuntimeConfig.GRAPHQL_API_TOKEN
    ? withLocalAuth(KeycloakProvider, initialAuth)
    : withKeycloak(KeycloakProvider, initialAuth);