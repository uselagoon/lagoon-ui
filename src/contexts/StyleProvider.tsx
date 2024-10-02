'use client';

import { ReactNode } from 'react';

import { GlobalStyles, UIThemeProvider } from '@uselagoon/ui-library';

import AntdRegistry from '../lib/AntdRegistry';
import StyledComponentsRegistry from '../lib/StyledComponentsRegistry';

const StyleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <StyledComponentsRegistry>
        <UIThemeProvider>
          <GlobalStyles />
          {children}
        </UIThemeProvider>
      </StyledComponentsRegistry>
    </AntdRegistry>
  );
};
export default StyleProvider;
