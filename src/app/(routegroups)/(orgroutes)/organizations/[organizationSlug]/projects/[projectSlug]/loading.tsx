'use client';

import { SetStateAction } from 'react';

import { CheckboxContainer } from '@/components/pages/organizations/groups/_components/styles';
import { notificationTypeOptions } from '@/components/pages/organizations/notifications/_components/filterOptions';
import { groupFilterOptions } from '@/components/pages/organizations/project/_components/filterOptions';
import { Separator } from '@/components/pages/organizations/project/_components/styles';
import { Checkbox, Head3, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { OrgGroupsTable, OrgNotificationsTable } = Table;
export default function Loading() {
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

      <OrgGroupsTable skeleton />

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

      <OrgNotificationsTable type="subTable" skeleton />
    </>
  );
}
