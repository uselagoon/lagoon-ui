'use client';

import BackButton from '@/components/backButton/BackButton';
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
