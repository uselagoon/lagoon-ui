'use client';

import { Head2, Table } from '@uselagoon/ui-library';

const { VariablesTable } = Table;
export default function Loading() {
  return (
    <>
      <Head2>Project variables</Head2>
      <VariablesTable skeleton withValues={false} />
    </>
  );
}
