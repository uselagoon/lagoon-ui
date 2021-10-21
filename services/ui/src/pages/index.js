import React, { useEffect} from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const { keycloak } = useKeycloak();
  const loggedIn = keycloak.authenticated;

  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push('/projects')
    }
  }, [loggedIn])

  return <p>Redirecting...</p>
};

export default IndexPage;