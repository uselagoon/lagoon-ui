'use client';

import React, { ReactNode, useMemo } from 'react';

import { useSession } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useEnvContext } from 'next-runtime-env';
import { usePathname } from 'next/navigation';

import { Colors, HeaderProps, PageContainer, useTheme } from '@uselagoon/ui-library';
import { ItemType } from 'antd/es/menu/interface';

import { getUserMenuItems, navLinks } from '../components/links';

const AppProvider = ({ children, kcUrl, logo }: { children: ReactNode; kcUrl?: string; logo?: ReactNode }) => {
  const { status, data } = useSession();
  const { theme, toggleTheme } = useTheme();

  const pathname = usePathname();

  const userData = status === 'authenticated' ? data.user : { name: '', email: '', image: '' };

  const { LAGOON_UI_ICON } = useEnvContext();

  const memoizedLogo = useMemo(() => {
    const getLogo = () => {
      // either uses a logo from a prop, runtime env var; if undefined - ui library will default to LagoonLogo;
      if (logo) return logo;

      if (LAGOON_UI_ICON) {
        if (theme === 'dark') {
          return <img alt="Home" className="icon logo" src={`data:image/svg+xml;utf8,${LAGOON_UI_ICON}`} />;
        }

        // light mode - get the direct `path` children of the <svg> with applied clip-path and #fff fill, replace with #000;

        const decodedSvg = decodeURIComponent(LAGOON_UI_ICON);
        const modifiedSvg = decodedSvg.replace(
          /(<path[^>]+clip-path=['"][^'"]+['"][^>]*?)fill:\s*#fff;/g,
          '$1fill:#000;'
        );
        const reEncodedSvg = encodeURIComponent(modifiedSvg);

        return <img alt="Home" className="icon logo" src={`data:image/svg+xml;utf8,${reEncodedSvg}`} />;
      }
      return undefined;
    };

    return getLogo();
  }, [LAGOON_UI_ICON, theme]);

  return (
    <PageContainer
      showHeader
      headerProps={{
        userInfo: userData as HeaderProps['userInfo'],
        userDropdownMenu: getUserMenuItems(kcUrl!) as ItemType[],
        navLinks,
        currentPath: pathname,
        toggleTheme,
        logo: memoizedLogo,
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
