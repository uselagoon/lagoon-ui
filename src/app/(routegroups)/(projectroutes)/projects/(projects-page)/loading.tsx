'use client';

import { Table } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

export default function Loading() {
  const [search, setSearch] = useQueryState('search');
  return (
    <>
      <Table />
    </>
  );
}
