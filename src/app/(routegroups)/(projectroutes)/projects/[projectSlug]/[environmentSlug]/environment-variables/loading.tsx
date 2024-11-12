'use client';

import { Head2, Table } from '@uselagoon/ui-library';

const { ProjectVariablesTable } = Table;
export default function Loading() {
  return (
    <>
      <Head2>Environment variables</Head2>
      <ProjectVariablesTable skeleton />
    </>
  );
}
