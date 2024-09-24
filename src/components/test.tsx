'use client';

import { signIn, useSession } from 'next-auth/react';

import { SignOutBtn } from './auth/SignOut';

export default function Test() {
  const { status } = useSession();

  return (
    <>
      {status === 'loading' || status === 'authenticated' ? null : (
        <button onClick={() => signIn('keycloak')}>SIGN IN</button>
      )}
      <SignOutBtn />
    </>
  );
}
