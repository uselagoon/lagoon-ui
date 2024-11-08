'use client';

import { ReactNode } from 'react';

import { Button, Head1 } from '@uselagoon/ui-library';

export const Client404 = ({ navLink, title }: { navLink: ReactNode; title?: string }) => {
  return (
    <>
      <Head1>{title ? title : 'This page could not be found'}</Head1>
      <Button>{navLink}</Button>
    </>
  );
};
