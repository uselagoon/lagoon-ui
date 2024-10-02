'use client';

import React, { ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { BreadCrumb, Colors, HeaderProps, PageContainer, useTheme } from '@uselagoon/ui-library';
import { ItemType } from 'antd/es/menu/interface';

import { getUserMenuItems, navLinks } from '../components/links';

const AppProvider = ({ children, kcUrl }: { children: ReactNode; kcUrl?: string }) => {
  const { status, data } = useSession();
  const { toggleTheme } = useTheme();

  const { push } = useRouter();
  const pathname = usePathname();

  const userData = status === 'authenticated' ? data.user : { name: '', email: '', image: '' };

  return (
    <PageContainer
      showHeader
      headerProps={{
        userInfo: userData as HeaderProps['userInfo'],
        userDropdownMenu: getUserMenuItems(kcUrl!) as ItemType[],
        navLinks,
        currentPath: pathname,
        logoNav: () => push('/projects'),
        toggleTheme,
      }}
    >
      <ProgressBar
        height="2px"
        color={Colors.lagoonBlue}
        options={{ showSpinner: false, parent: '.content' }}
        shallowRouting
      />
      {children}
    </PageContainer>
  );
};
export default AppProvider;
