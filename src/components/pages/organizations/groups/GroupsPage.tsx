'use client';

import { SetStateAction } from 'react';

import { usePathname } from 'next/navigation';

import {
  OrgGroup,
  OrganizationGroupsData,
} from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/groups/(groups-page)/page';
import { AddUserToGroup } from '@/components/addUserToGroup/AddUserToGroup';
import { CreateGroup } from '@/components/createGroup/CreateGroup';
import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import { GET_SINGLE_GROUP } from '@/lib/query/organizations/organizationByName.groups';
import { QueryRef, useApolloClient, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import { useQueryStates } from 'nuqs';

import { DeleteGroup } from './_components/DeleteGroup';
import { groupFilterValues, resultsFilterValues } from './_components/groupFilterValues';
import { CheckboxContainer } from './_components/styles';

const { OrgGroupsTable } = Table;

export default function GroupsPage({
  queryRef,
  organizationSlug,
}: {
  queryRef: QueryRef<OrganizationGroupsData>;
  organizationSlug: string;
}) {
  const [{ results, group_query, group_sort, showDefaults }, setQuery] = useQueryStates({
    results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => {
        if (value == undefined || Number.isNaN(value)) {
          return undefined;
        }

        const num = Number(value);

        if (num > 100) {
          return 100;
        }
        return num;
      },
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

  const client = useApolloClient();

  const batchUpdateGroupData = (groupsWithMemberCount: Array<{ id: string; memberCount: number }>) => {
    client.cache.batch({
      update(cache) {
        groupsWithMemberCount.forEach(group => {
          const id = client.cache.identify({ __typename: 'OrgGroup', id: group.id });
          cache.modify({
            id,
            fields: {
              memberCount() {
                return group.memberCount;
              },
            },
          });
        });
      },
    });
  };

  const queryOnDataChange = async (data: Partial<OrgGroup>[]) => {
    const groupNames = data.map(d => d.name);

    const promises = groupNames.map(name => {
      return client.query({
        query: GET_SINGLE_GROUP,
        variables: { name, organization: organization.id },
        fetchPolicy: 'network-only',
      });
    });

    const groupsPromises = await Promise.allSettled(promises);

    const groupsWithMemberCount = groupsPromises
      .filter(pr => pr.status === 'fulfilled')
      .map(({ value }) => value.data.group);

    batchUpdateGroupData(groupsWithMemberCount);
  };

  const onAddUser = async (groupName: string) => {
    await queryOnDataChange([{ name: groupName }]);
  };

  if (!organization) {
    return <OrganizationNotFound orgName={organizationSlug} />;
  }

  let orgGroups = organization.groups;

  const existingGroupNames = orgGroups.map(g => g.name);
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
        <Tooltip title="Select this to show all system and default organization groups" placement="right">
          <CheckboxContainer>
            <Checkbox checked={showDefaults} onChange={setShowDefaults}>
              Show System Groups
            </Checkbox>
          </CheckboxContainer>
        </Tooltip>
      </LagoonFilter>

      <OrgGroupsTable
        onVisibleDataChange={queryOnDataChange}
        basePath={pathname}
        groups={orgGroups}
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
        deleteUserModal={group => <DeleteGroup group={group} refetch={refetch} />}
        addUserModal={group => <AddUserToGroup variant="icon" groupName={group.name} onAddUser={onAddUser} />}
      />
    </>
  );
}
