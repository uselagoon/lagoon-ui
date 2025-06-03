'use client';

import React, { ReactNode } from 'react';

import Link from 'next/link';

import { NextLinkProvider } from '@uselagoon/ui-library';

const StyleProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NextLinkProvider linkComponent={Link}>{children}</NextLinkProvider>
    </>
  );
};
export default StyleProvider;
