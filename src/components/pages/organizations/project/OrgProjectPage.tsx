'use client';

import { SetStateAction } from 'react';

import { OrganizationProjectData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/projects/[projectSlug]/page';
import { AddGroupToProject } from '@/components/addGroupToProject/AddGroupToProject';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Checkbox, Head3, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { resultsFilterValues } from '../groups/_components/groupFilterValues';
import { CheckboxContainer } from '../groups/_components/styles';
import { notificationTypeOptions } from '../notifications/_components/filterOptions';
import { AddNotificationToProject } from './_components/AddNotificationToProject';
import { UnlinkGroup } from './_components/UnlinkGroup';
import { UnlinkNotification } from './_components/UnlinkNotification';
import { groupFilterOptions } from './_components/filterOptions';
import { Separator } from './_components/styles';
import { transformNotifications } from './_components/transformNotifications';

const { OrgGroupsTable, OrgNotificationsTable } = Table;

export default function OrgProjectPage({ queryRef }: { queryRef: QueryRef<OrganizationProjectData> }) {
  const [{ group_results, group_query, group_sort, showDefaults, notification_query, notification_type }, setQuery] =
    useQueryStates({
      group_results: {
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

      notification_type: {
        defaultValue: undefined,
        parse: (value: string | undefined) => value as 'slack' | 'rocketChat' | 'email' | 'webhook' | 'teams',
      },
      notification_query: {
        defaultValue: '',
        parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
      },
    });

  const setGroupQuery = (str: string) => {
    setQuery({ group_query: str });
  };

  const setGroupSort = (val: string) => {
    if (['name_asc', 'name_desc'].includes(val)) {
      setQuery({ group_sort: val });
    } else {
      setQuery({ group_sort: null });
    }
  };

  const setGroupResults = (val: string) => {
    setQuery({ group_results: Number(val) });
  };

  const setNotificationQuery = (str: string) => {
    setQuery({ notification_query: str });
  };

  const setShowDefaults = () => {
    setQuery({ showDefaults: !showDefaults });
  };

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization, project },
  } = useReadQuery(queryRef);

  const orgBasePath = `/organizations/${organization.name}`;

  const projectNotificationsByType = transformNotifications(project.notifications);

  const filteredGroups = organization.groups.filter(group => {
    return project.groups.every(p => p.name !== group.name);
  });

  const linkedNotifications = {
    slacks: projectNotificationsByType.slacks || [],
    webhooks: projectNotificationsByType.webhooks || [],
    rocketChats: projectNotificationsByType.rocketChats || [],
    emails: projectNotificationsByType.emails || [],
    teams: projectNotificationsByType.teams || [],
  };

  const allNotifications = [
    ...organization.slacks,
    ...organization.webhook,
    ...organization.rocketchats,
    ...organization.emails,
    ...organization.teams,
  ];
  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: group_query || '',
          setSearchText: setGroupQuery as React.Dispatch<SetStateAction<string>>,
        }}
        sortOptions={{
          options: groupFilterOptions,
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

      <Head3>Groups</Head3>

      <OrgGroupsTable
        basePath={`${orgBasePath}/groups`}
        groups={project.groups}
        sortBy={group_sort as 'name_asc' | 'name_desc' | 'memberCount_asc' | 'memberCount_desc'}
        filterString={group_query}
        showDefaults={showDefaults}
        resultsPerPage={group_results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={group_results}
            defaultOpen={false}
            placeholder="Number of groups"
            onSelect={val => {
              setGroupResults(val);
            }}
          />
        }
        deleteUserModal={group => <UnlinkGroup projectName={project.name} group={group} refetch={refetch} />}
        newGroupModal={<AddGroupToProject projectName={project.name} groups={filteredGroups} refetch={refetch} />}
      />

      <Separator />

      <Head3>Notifications</Head3>
      <LagoonFilter
        searchOptions={{
          searchText: notification_query || '',
          setSearchText: setNotificationQuery as React.Dispatch<SetStateAction<string>>,
        }}
      >
        <Select
          options={notificationTypeOptions}
          defaultOpen={false}
          value={notification_type}
          placeholder="Badge"
          allowClear
          onClear={() => {
            setQuery({ notification_type: null });
          }}
          onSelect={val => {
            setQuery({ notification_type: val });
          }}
        />
      </LagoonFilter>

      <OrgNotificationsTable
        type="subTable"
        orgName={organization.name}
        filterString={notification_query}
        notifications={linkedNotifications}
        filterNotificationType={notification_type as 'slack' | 'rocketChat' | 'email' | 'webhook' | 'teams'}
        unlinkNotificationModal={notification => (
          <UnlinkNotification
            notification={notification as { name: string; type: string }}
            projectName={project.name}
            refetch={refetch}
          />
        )}
        newNotificationModal={
          <AddNotificationToProject
            projectName={project.name}
            linkedNotifications={linkedNotifications}
            allNotifications={allNotifications}
          />
        }
      />
    </>
  );
}
