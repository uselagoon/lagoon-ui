'use client';

import { SetStateAction } from 'react';

import { usePathname } from 'next/navigation';

import { OrganizationGroupsData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/groups/(groups-page)/page';
import { CreateGroup } from '@/components/createGroup/CreateGroup';
import { DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { groupFilterValues, resultsFilterValues } from './_components/groupFilterValues';
import { CheckboxContainer } from './_components/styles';

const { OrgGroupsTable } = Table;

export default function GroupsPage({ queryRef }: { queryRef: QueryRef<OrganizationGroupsData> }) {
  const [{ results, group_query, group_sort, showDefaults }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
    },
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

  const setGroupsResults = (val: string) => {
    setQuery({ results: Number(val) });
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  const pathname = usePathname();

  const existingGroupNames = organization.groups.map(g => g.name);
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

      <OrgGroupsTable
        basePath={pathname}
        groups={organization.groups}
        sortBy={group_sort as 'name_asc' | 'name_desc' | 'memberCount_asc' | 'memberCount_desc'}
        filterString={group_query}
        showDefaults={showDefaults}
        resultsPerPage={results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            defaultOpen={false}
            placeholder="Number of results"
            onSelect={val => {
              setGroupsResults(val);
            }}
          />
        }
        newGroupModal={
          <CreateGroup variant="small" organizationId={organization.id} existingGroupNames={existingGroupNames} />
        }
        deleteUserModal={current => {
          return <DeleteOutlined />;
        }}
        addUserModal={current => {
          return <UserAddOutlined />;
        }}
      />
    </>
  );
}
