'use client';

import { ReactNode, useEffect } from 'react';

import { signIn, useSession } from 'next-auth/react';

import manualSignOut from '../../../utils/manualSignOut';

/**
 *
 * A wrapper component used to initiate a forced keycloak auth on the client
 * if there was an error refreshing token on the server (refresh token expired)
 */
export default function SessionRedirect({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const initiateSignIn = async () => {
    await manualSignOut();
    signIn('keycloak'); // Force sign in to obtain a new set of access and refresh tokens
  };

  useEffect(() => {
    if (session?.error !== 'RefreshTokenError') return;

    initiateSignIn();
  }, [session?.error, initiateSignIn]);

  useEffect(() => {
    if (status !== 'unauthenticated') return;

    initiateSignIn();
  }, [status, initiateSignIn]);

  if (status === 'unauthenticated' || session?.error) {
    return null;
  }
  return <>{children}</>;
}
