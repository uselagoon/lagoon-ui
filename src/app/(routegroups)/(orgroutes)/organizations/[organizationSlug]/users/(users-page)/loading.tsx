'use client';

import { SetStateAction } from 'react';

import { CheckboxContainer } from '@/components/pages/organizations/groups/_components/styles';
import { userFilterOptions } from '@/components/pages/organizations/users/_components/filterOptions';
import { Checkbox, LagoonFilter, Table } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import { useQueryStates } from 'nuqs';

const { OrgUsersTable } = Table;
export default function Loading() {
  const [{ user_query, user_sort, showDefaults }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
    },
    user_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : null),
    },
    user_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    showDefaults: {
      defaultValue: false,
      parse: (value: string | undefined) => value === 'true',
      serialize: (value: boolean) => String(value),
    },
  });

  const setUserQuery = (str: string) => {
    setQuery({ user_query: str });
  };
  const setUserSort = (val: string) => {
    if (
      [
        'firstName_asc',
        'firstName_desc',
        'lastName_asc',
        'lastName_desc',
        'email_asc',
        'email_desc',
        'groupCount_asc',
        'groupCount_desc',
      ].includes(val)
    ) {
      setQuery({ user_sort: val });
    } else {
      setQuery({ user_sort: null });
    }
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: user_query || '',
          setSearchText: setUserQuery as React.Dispatch<SetStateAction<string>>,
        }}
        sortOptions={{
          options: userFilterOptions,
          selectedState: user_sort,
          setSelectedState: setUserSort as React.Dispatch<SetStateAction<unknown>>,
        }}
      >
        <Tooltip title="Select this to show all system and default organizastion users" placement="right">
          <CheckboxContainer>
            <Checkbox checked={showDefaults} onChange={setShowDefaults}>
              Show Default Users
            </Checkbox>
          </CheckboxContainer>
        </Tooltip>
      </LagoonFilter>

      <OrgUsersTable type="standalone" skeleton />
    </>
  );
}
