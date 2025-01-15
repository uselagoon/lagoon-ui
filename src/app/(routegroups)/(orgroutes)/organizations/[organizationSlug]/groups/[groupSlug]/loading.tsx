'use client';

import { SetStateAction } from 'react';

import {
  projectFilterOptions,
  userFilterOptions,
} from '@/components/pages/organizations/group/_components/filterValues';
import { CheckboxContainer } from '@/components/pages/organizations/groups/_components/styles';
import { Checkbox, Head3, LagoonFilter, Table } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import { useQueryStates } from 'nuqs';

const { OrgUsersTable, OrgProjectsTable } = Table;
export default function Loading() {
  const [{ user_query, user_sort, showDefaults, project_query, project_sort }, setQuery] = useQueryStates({
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

    project_sort: {
      defaultValue: null,
      parse: (value: string | undefined) => (value !== undefined ? String(value) : null),
    },

    project_query: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
  });

  const setUserQuery = (str: string) => {
    setQuery({ user_query: str });
  };

  const setGroupSort = (val: string) => {
    if (['firstName_asc', 'firstName_desc', 'lastName_asc', 'lastName_desc', 'email_asc', 'email_desc'].includes(val)) {
      setQuery({ user_sort: val });
    } else {
      setQuery({ user_sort: null });
    }
  };

  const setProjectSort = (val: string) => {
    if (['name_asc', 'name_desc'].includes(val)) {
      setQuery({ project_sort: val });
    } else {
      setQuery({ project_sort: null });
    }
  };

  const setProjectQuery = (str: string) => {
    setQuery({ project_query: str });
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
          setSelectedState: setGroupSort as React.Dispatch<SetStateAction<unknown>>,
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

      <Head3>Users</Head3>

      <OrgUsersTable type="subTable" skeleton />

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

      <Head3>Projects</Head3>

      <OrgProjectsTable type="subTable" skeleton />
    </>
  );
}
