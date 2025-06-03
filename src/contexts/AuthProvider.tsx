'use client';

import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  //@ts-expect-error: next-auth still in beta! 🤡
  return <SessionProvider refetchInterval={120}>{children}</SessionProvider>;
};
export default AuthProvider;
