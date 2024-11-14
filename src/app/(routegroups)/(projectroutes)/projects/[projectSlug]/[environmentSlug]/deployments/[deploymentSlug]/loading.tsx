'use client';

import BackButton from '@/components/deployment/_components/BackButton';
import { Table } from '@uselagoon/ui-library';

const { DeploymentTable } = Table;
export default function Loading() {
  return (
    <>
      <BackButton />
      <DeploymentTable skeleton />
    </>
  );
}
