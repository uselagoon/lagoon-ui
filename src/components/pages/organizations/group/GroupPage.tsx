'use client';

import { SetStateAction } from 'react';

import { OrganizationGroupData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/groups/[groupSlug]/page';
import { AddProjectToGroup } from '@/components/addProjectToGroup/AddProjectToGroup';
import { AddUserToGroup } from '@/components/addUserToGroup/AddUserToGroup';
import { EditUserRole } from '@/components/editUserRole/EditUserRole';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, Head3, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { Tooltip } from 'antd';
import { useQueryStates } from 'nuqs';

import { resultsFilterValues } from '../groups/_components/groupFilterValues';
import { CheckboxContainer } from '../groups/_components/styles';
import { UnlinkGroupMember } from './_components/UnlinkGroupMember';
import { UnlinkGroupProject } from './_components/UnlinkGroupProject';
import { projectFilterOptions, userFilterOptions } from './_components/filterValues';
import { Separator } from './styles';

const { OrgUsersTable, OrgProjectsTable } = Table;

export default function GroupPage({ queryRef }: { queryRef: QueryRef<OrganizationGroupData> }) {
  const [
    { user_results, user_query, user_sort, showDefaults, project_results, project_query, project_sort },
    setQuery,
  ] = useQueryStates({
    user_results: {
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

    project_results: {
      defaultValue: undefined,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : undefined),
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

  const setUserResults = (val: string) => {
    setQuery({ user_results: Number(val) });
  };

  const setProjectResults = (val: string) => {
    setQuery({ project_results: Number(val) });
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

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization, group },
  } = useReadQuery(queryRef);

  const groupMemberUsers = group.members.map(user => ({
    ...user.user,
    role: user.role,
  }));

  const orgBasePath = `/organizations/${organization.name}`;

  const filteredProjects = organization.projects.filter(project => {
    return group.projects.every(p => p.name !== project.name);
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

      <OrgUsersTable
        type="subTable"
        filterString={user_query}
        basePath={`${orgBasePath}/users`}
        users={groupMemberUsers}
        sortBy={
          user_sort as
            | 'firstName_asc'
            | 'firstName_desc'
            | 'lastName_asc'
            | 'lastName_desc'
            | 'email_asc'
            | 'email_desc'
        }
        resultsPerPage={user_results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={user_results}
            defaultOpen={false}
            placeholder="Number of users"
            onSelect={val => {
              setUserResults(val);
            }}
          />
        }
        newUserModal={<AddUserToGroup variant="button" groupName={group.name} refetch={refetch} />}
        unlinkUserModal={user => <UnlinkGroupMember groupName={group.name} user={user} refetch={refetch} />}
        editUserGroupRoleModal={user => (
          <EditUserRole groupName={group.name} currentRole={user.role} email={user.email} refetch={refetch} />
        )}
      />

      <Separator />

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

      <OrgProjectsTable
        type="subTable"
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={project_results}
            defaultOpen={false}
            placeholder="Number of projects"
            onSelect={val => {
              setProjectResults(val);
            }}
          />
        }
        sortBy={project_sort as 'name_asc' | 'name_desc'}
        filterString={project_query}
        basePath={`${orgBasePath}/projects`}
        projects={group.projects}
        newProjectModal={<AddProjectToGroup projects={filteredProjects} groupName={group.name} refetch={refetch} />}
        unlinkProjectModal={project => (
          <UnlinkGroupProject project={project} groupName={group.name} refetch={refetch} />
        )}
      />
    </>
  );
}
