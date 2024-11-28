'use client';

import { SetStateAction } from 'react';

import { projectFilterOptions } from '@/components/pages/organizations/group/_components/filterValues';
import { LagoonFilter, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { OrgProjectsTable } = Table;
export default function Loading() {
  const [{ project_query, project_sort }, setQuery] = useQueryStates({
    project_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : null),
    },
    project_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
  });

  const setProjectQuery = (str: string) => {
    setQuery({ project_query: str });
  };
  const setProjectSort = (val: string) => {
    if (['name_asc', 'name_desc', 'groupCount_asc', 'groupCount_desc'].includes(val)) {
      setQuery({ project_sort: val });
    } else {
      setQuery({ project_sort: null });
    }
  };

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: project_query || '',
          setSearchText: setProjectQuery as React.Dispatch<SetStateAction<string>>,
        }}
        sortOptions={{
          options: projectFilterOptions,
          selectedState: project_sort,
          setSelectedState: setProjectSort as React.Dispatch<SetStateAction<unknown>>,
        }}
      />

      <OrgProjectsTable type="standalone" skeleton />
    </>
  );
}
