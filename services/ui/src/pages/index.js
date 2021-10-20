import React from 'react';
import { useKeycloak } from '@react-keycloak/ssr';

const IndexPage = () => {
  const { keycloak } = useKeycloak();
  const loggedinState = keycloak.authenticated;

  return <></>
};

export default IndexPage;