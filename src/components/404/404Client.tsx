'use client';

import { ReactNode } from 'react';

export const Client404 = ({ navLink, title }: { navLink: ReactNode; title?: string }) => {
  return (
    <>
      <h1>{title ? title : 'This page could not be found'}</h1>
      <button>{navLink}</button>
    </>
  );
};
