'use client';

import { SetStateAction } from 'react';

import { scopeOptions, sortOptions } from '@/components/environmentVariables/_components/filterValues';
import { Head2, LagoonFilter, Table } from '@uselagoon/ui-library';
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
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
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
      <Head2>Environment variables</Head2>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: sortOptions,
          selectedState: sort,
          setSelectedState: setSort as React.Dispatch<SetStateAction<unknown>>,
        }}
        sortOptions={{
          options: scopeOptions,
          selectedState: scope,
          setSelectedState: setScope as React.Dispatch<SetStateAction<unknown>>,
        }}
      ></LagoonFilter>

      <VariablesTable skeleton />
    </>
  );
}
