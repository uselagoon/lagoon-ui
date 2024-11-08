'use client';

import { useRouter } from 'next/navigation';

import { Button, Head1 } from '@uselagoon/ui-library';

export const NotFoundGoBack = ({ title }: { title?: string }) => {
  const router = useRouter();
  return (
    <>
      <Head1>{title ? title : 'This page could not be found'}</Head1>
      <Button onClick={() => router.back()}>Go Back</Button>
    </>
  );
};
