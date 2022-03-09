import React, { useEffect} from 'react';
import { useKeycloak } from '@react-keycloak/ssr';
import { useRouter } from 'next/router';
import Head from 'next/head';

import StatusLayout from 'layouts/StatusLayout';

const IndexPage = () => {
  const { keycloak } = useKeycloak();
  const loggedIn = keycloak.authenticated;

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      if (loggedIn) {
        router.push('/projects')
      }
    }
  }, [loggedIn])

  return (
  <>
    <Head>
      <title>Lagoon</title>
    </Head>
    <StatusLayout>
      <h1>Redirecting...</h1>
    </StatusLayout>
  </>
  )
};

export default IndexPage;
