'use client';

import { SetStateAction } from 'react';

import { usePathname } from 'next/navigation';

import { OrganizationUsersData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/users/(users-page)/page';
import { AddUser } from '@/components/addUserToOrg/Adduser';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import { useQueryStates } from 'nuqs';

import { CheckboxContainer } from '../groups/_components/styles';
import { RemoveUser } from './_components/RemoveUser';
import { resultsFilterValues, userFilterOptions } from './_components/filterOptions';

const { OrgUsersTable } = Table;

export default function UsersPage({
  orgId,
  queryRef,
  groups,
}: {
  orgId: number;
  queryRef: QueryRef<OrganizationUsersData>;
  groups: {
    name: string;
  }[];
}) {
  const [{ results, user_query, user_sort, showDefaults }, setQuery] = useQueryStates({
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

  const setGroupsResults = (val: string) => {
    setQuery({ results: Number(val) });
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { users },
  } = useReadQuery(queryRef);

  const pathname = usePathname();

  const groupSelectOptions = groups.map(group => {
    return { value: group.name, label: group.name };
  });

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

      <OrgUsersTable
        type="standalone"
        users={users}
        basePath={pathname}
        sortBy={
          user_sort as
            | 'firstName_asc'
            | 'firstName_desc'
            | 'lastName_asc'
            | 'lastName_desc'
            | 'email_asc'
            | 'email_desc'
            | 'groupCount_asc'
            | 'groupCount_desc'
        }
        filterString={user_query}
        showDefaults={showDefaults}
        resultsPerPage={results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            defaultOpen={false}
            placeholder="Number of users"
            onSelect={val => {
              setGroupsResults(val);
            }}
          />
        }
        newUserModal={<AddUser refetch={refetch} variant="small" groupOptions={groupSelectOptions} type="multiple" />}
        deleteUserModal={user => <RemoveUser user={user} refetch={refetch} orgId={orgId} />}
      />
    </>
  );
}
