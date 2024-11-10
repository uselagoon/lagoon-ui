'use client';

import { SetStateAction } from 'react';

import { LagoonFilter, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { AllDeploymentsTable } = Table;

export default function Loading() {
  const [{ results, search }, setQuery] = useQueryStates({
    results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };
  const setResults = (val: string) => {
    setQuery({ results: Number(val) });
  };
  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: [
            {
              value: 10,
              label: '10 Results per page',
            },
            {
              value: 20,
              label: '20 Results per page',
            },
            {
              value: 50,
              label: '50 Results per page',
            },
          ],
          selectedState: results,
          setSelectedState: setResults as React.Dispatch<SetStateAction<unknown>>,
        }}
      />

      <AllDeploymentsTable skeleton />
    </>
  );
}
