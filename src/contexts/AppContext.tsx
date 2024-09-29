'use client';

import React, { ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

import { HeaderProps, PageContainer, useTheme } from '@uselagoon/ui-library';

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { status, data } = useSession();

  const { toggleTheme } = useTheme();

  const userData = status === 'authenticated' ? data.user : {};

  const navLinks = [<Link href="/">Home</Link>, <Link href="/organizations">Organizations</Link>];
  return (
    <PageContainer
    className='testing'
      showHeader
      headerProps={{
        userInfo: userData as HeaderProps['userInfo'],
        toggleTheme,
        navLinks,
      }}
    >
      {children}
    </PageContainer>
  );
};
export default AppProvider;
