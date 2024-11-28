'use client';

import { SetStateAction } from 'react';

import { groupFilterValues } from '@/components/pages/organizations/groups/_components/groupFilterValues';
import { CheckboxContainer } from '@/components/pages/organizations/groups/_components/styles';
import { Checkbox, LagoonFilter, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { OrgGroupsTable } = Table;

export default function Loading() {
  const [{ group_query, group_sort, showDefaults }, setQuery] = useQueryStates({
    group_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : null),
    },
    group_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    showDefaults: {
      defaultValue: false,
      parse: (value: string | undefined) => value === 'true',
      serialize: (value: boolean) => String(value),
    },
  });

  const setGroupQuery = (str: string) => {
    setQuery({ group_query: str });
  };
  const setGroupSort = (val: string) => {
    if (['name_asc', 'name_desc', 'memberCount_asc', 'memberCount_desc'].includes(val)) {
      setQuery({ group_sort: val });
    } else {
      setQuery({ group_sort: null });
    }
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };
  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: group_query || '',
          setSearchText: setGroupQuery as React.Dispatch<SetStateAction<string>>,
        }}
        sortOptions={{
          options: groupFilterValues,
          selectedState: group_sort,
          setSelectedState: setGroupSort as React.Dispatch<SetStateAction<unknown>>,
        }}
      >
        <CheckboxContainer>
          <Checkbox checked={showDefaults} onChange={setShowDefaults}>
            Show System Groups
          </Checkbox>
        </CheckboxContainer>
      </LagoonFilter>
      <OrgGroupsTable skeleton />
    </>
  );
}
