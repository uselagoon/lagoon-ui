'use client';

import { Head2, LoadingSkeleton, Table } from '@uselagoon/ui-library';

const { BulkDeploymentsTable } = Table;

export default function Loading() {
  return (
    <>
      <Head2>
        <LoadingSkeleton width={200} />
      </Head2>
      <BulkDeploymentsTable skeleton />
    </>
  );
}
