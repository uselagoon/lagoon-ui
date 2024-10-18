'use client';

import { ReactNode } from 'react';

import { GlobalStyles, NextLinkProvider, UIThemeProvider } from '@uselagoon/ui-library';
import AntdRegistry from '../lib/AntdRegistry';
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';
import Link from 'next/link';

const StyleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <StyledComponentsRegistry>
        <UIThemeProvider>
          <GlobalStyles />
          <NextLinkProvider linkComponent={Link}>
          {children}
          </NextLinkProvider>
        </UIThemeProvider>
      </StyledComponentsRegistry>
    </AntdRegistry>
  );
};
export default StyleProvider;
