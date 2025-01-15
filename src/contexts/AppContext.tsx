'use client';

import React, { ReactNode } from 'react';

import { useSession } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useEnvContext } from 'next-runtime-env';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Colors, HeaderProps, PageContainer, useTheme } from '@uselagoon/ui-library';
import { ItemType } from 'antd/es/menu/interface';

import { getUserMenuItems, navLinks } from '../components/links';

const AppProvider = ({ children, kcUrl, logo }: { children: ReactNode; kcUrl?: string; logo?: ReactNode }) => {
  const { status, data } = useSession();
  const { toggleTheme } = useTheme();

  const { push } = useRouter();
  const pathname = usePathname();

  const userData = status === 'authenticated' ? data.user : { name: '', email: '', image: '' };

  const { LAGOON_UI_ICON } = useEnvContext();

  const getLogo = () => {
    // either uses a logo from a prop, runtime env var; if undefined - ui library will default to LagoonLogo;
    if (logo) return logo;

    if (LAGOON_UI_ICON) {
      return <img alt="Home" className="icon logo" src={`data:image/svg+xml;utf8,${LAGOON_UI_ICON}`} />;
    }
    return undefined;
  };

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
        logo: getLogo(),
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
