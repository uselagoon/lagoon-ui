'use client';

import { SetStateAction } from 'react';

import { OrganizationUserData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/users/[userSlug]/page';
import { DisconnectOutlined, EditOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, Head3, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { CheckboxContainer } from '../groups/_components/styles';
import { resultsFilterValues, userFilterOptions } from './_components/filterValues';

const { OrgUserGroupsTable } = Table;

export default function UserPage({ queryRef, orgName }: { queryRef: QueryRef<OrganizationUserData>; orgName: string }) {
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
    if (['name_asc', 'name_desc'].includes(val)) {
      setQuery({ user_sort: val });
    } else {
      setQuery({ user_sort: null });
    }
  };

  const setResults = (val: string) => {
    setQuery({ results: Number(val) });
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { userByEmailAndOrganization },
  } = useReadQuery(queryRef);

  const orgBasePath = `/organizations/${orgName}`;

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
        <CheckboxContainer>
          <Checkbox checked={showDefaults} onChange={setShowDefaults}>
            Show System Groups
          </Checkbox>
        </CheckboxContainer>
      </LagoonFilter>

      <Head3>User Groups</Head3>

      <OrgUserGroupsTable
        userGroups={userByEmailAndOrganization.groupRoles}
        filterString={user_query}
        showDefaults={showDefaults}
        sortBy={user_sort as 'name_asc' | 'name_desc'}
        basePath={`${orgBasePath}/groups`}
        resultsPerPage={results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            defaultOpen={false}
            placeholder="Number of groups"
            onSelect={val => {
              setResults(val);
            }}
          />
        }
        unlinkGroupModal={current => (
          <>
            <DisconnectOutlined />
          </>
        )}
        editUserRoleModal={current => (
          <>
            <EditOutlined />
          </>
        )}
      />
    </>
  );
}
