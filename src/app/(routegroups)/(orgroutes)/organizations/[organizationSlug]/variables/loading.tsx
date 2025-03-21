'use client';

import { SetStateAction } from 'react';

import { scopeOptions, sortOptions } from '@/components/pages/environmentVariables/_components/filterValues';
import { Head2, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';
import { useQueryStates } from 'nuqs';

const { VariablesTable } = Table;
export default function Loading() {
  const [{ search, sort, scope }, setQuery] = useQueryStates({
    results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    sort: {
      defaultValue: null,
      parse: (value: string) => {
        if (['name_asc', 'name_desc', 'scope_asc', 'scope_desc'].includes(value)) return String(value);

        return null;
      },
    },

    scope: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as Variable['scope'],
    },
  });

  const setSearch = (val: string) => {
    setQuery({ search: val });
  };

  const setScope = (val: Variable['scope']) => {
    setQuery({ scope: val });
  };

  const setSort = (val: string) => {
    setQuery({ sort: val });
  };

  return (
    <>
      <Head2>Organization variables</Head2>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
      >
        <Select
          options={sortOptions}
          value={sort}
          defaultOpen={false}
          placeholder="Sort by"
          onSelect={val => {
            setSort(val);
          }}
        />

        <Select
          options={scopeOptions}
          defaultOpen={false}
          value={scope}
          placeholder="Scope"
          onSelect={val => {
            setScope(val);
          }}
        />
      </LagoonFilter>

      <VariablesTable skeleton withValues={false} />
    </>
  );
}
