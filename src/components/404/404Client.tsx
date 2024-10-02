'use client';

import { ReactNode } from 'react';

import { Button, Head1 } from '@uselagoon/ui-library';

export const Client404 = ({ navLink }: { navLink: ReactNode }) => {
  return (
    <>
      <Head1>This page could not be found</Head1>
      <Button>{navLink}</Button>
    </>
  );
};
