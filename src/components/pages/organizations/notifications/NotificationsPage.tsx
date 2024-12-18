'use client';

import { SetStateAction } from 'react';

import { OrganizationNotificationData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/notifications/page';
import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { AddNotification } from './_components/AddNotification';
import { DeleteNotification } from './_components/DeleteNotification';
import { EditNotification, Notification } from './_components/EditNotification';
import { notificationTypeOptions } from './_components/filterOptions';

const { OrgNotificationsTable } = Table;

type NotificationType = 'slack' | 'rocketchat' | 'email' | 'webhook' | 'teams';

export default function NotificationsPage({
  queryRef,
  organizationSlug,
}: {
  queryRef: QueryRef<OrganizationNotificationData>;
  organizationSlug: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  if (!organization) {
    return <OrganizationNotFound orgName={organizationSlug} />;
  }

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
        newNotificationModal={<AddNotification orgId={organization.id} refetch={refetch} />}
        editNotificationModal={notification => (
          <EditNotification notification={notification as Notification} refetch={refetch} />
        )}
        deleteNotificationModal={notification => (
          <DeleteNotification
            refetch={refetch}
            notification={notification as { name: string; type: NotificationType }}
          />
        )}
      />
    </>
  );
}
