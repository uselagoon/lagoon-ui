'use client';

import { SetStateAction } from 'react';

import { typeOptions } from '@/components/pages/organizations/manage/_components/filterOptions';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { OrgAdminsTable } = Table;
export default function Loading() {
  const [{ search, type }, setQuery] = useQueryStates({
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    type: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as 'admin' | 'owner' | 'viewer',
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };
  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
      >
        <Select
          options={typeOptions}
          defaultOpen={false}
          value={type}
          placeholder="Badge"
          allowClear
          onClear={() => {
            setQuery({ type: null });
          }}
          onSelect={val => {
            setQuery({ type: val });
          }}
        />
      </LagoonFilter>
      <OrgAdminsTable skeleton />
    </>
  );
}
