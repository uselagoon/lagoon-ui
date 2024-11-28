'use client';

import { SetStateAction } from 'react';

import { OrganizationNotificationData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/notifications/page';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { notificationTypeOptions } from './_components/filterOptions';

const { OrgNotificationsTable } = Table;

export default function NotificationsPage({ queryRef }: { queryRef: QueryRef<OrganizationNotificationData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  const [{ search, type }, setQuery] = useQueryStates({
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    type: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as 'slack' | 'rocketChat' | 'email' | 'webhook' | 'teams',
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
      >
        <Select
          options={notificationTypeOptions}
          defaultOpen={false}
          value={type}
          placeholder="Badge"
          allowClear
          onClear={() => {
            setQuery({ type: null });
          }}
          onSelect={val => {
            setQuery({ type: val });
          }}
        />
      </LagoonFilter>

      <OrgNotificationsTable
        type="standalone"
        orgName={organization.name}
        filterString={search}
        notifications={{
          slacks: organization.slacks,
          webhooks: organization.webhook,
          rocketChats: organization.rocketchats,
          emails: organization.emails,
          teams: organization.teams,
        }}
        filterNotificationType={type as 'slack' | 'rocketChat' | 'email' | 'webhook' | 'teams'}
        newNotificationModal={<>+ Add Notification</>}
        editNotificationModal={current => (
          <>
            <EditOutlined />
          </>
        )}
        deleteNotificationModal={current => (
          <>
            <DeleteOutlined />
          </>
        )}
      />
    </>
  );
}
