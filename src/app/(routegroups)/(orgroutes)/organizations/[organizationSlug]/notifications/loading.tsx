'use client';

import { SetStateAction } from 'react';

import { notificationTypeOptions } from '@/components/pages/organizations/notifications/_components/filterOptions';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

const { OrgNotificationsTable } = Table;
export default function Loading() {
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
          placeholder="Service"
          allowClear
          onClear={() => {
            setQuery({ type: null });
          }}
          onSelect={val => {
            setQuery({ type: val });
          }}
        />
      </LagoonFilter>

      <OrgNotificationsTable skeleton type="standalone" />
    </>
  );
}
