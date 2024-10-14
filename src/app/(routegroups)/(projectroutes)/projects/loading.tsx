'use client';

import { SetStateAction } from 'react';

import { LagoonFilter } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

export default function Loading() {
  const [search, setSearch] = useQueryState('search');
  return (
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
        selectedState: null,
        setSelectedState: () => {},
      }}
    />
  );
}
