'use client';

import { SetStateAction } from 'react';

import { OrganizationManageData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/manage/page';
import { EditOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { resultsFilterValues } from '../groups/_components/groupFilterValues';
import { AddUser } from './_components/AddUser';
import { DeleteUser } from './_components/DeleteUser';
import { EditUser } from './_components/EditUser';
import { typeOptions } from './_components/filterOptions';

const { OrgAdminsTable } = Table;
export default function ManagePage({ queryRef }: { queryRef: QueryRef<OrganizationManageData> }) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  const [{ results, search, type }, setQuery] = useQueryStates({
    results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    type: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as 'admin' | 'owner' | 'viewer',
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };
  const setResults = (val: string) => {
    setQuery({ results: Number(val) });
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
          options={typeOptions}
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

      <OrgAdminsTable
        owners={organization.owners}
        filterString={search}
        filterOwnerType={type as 'admin' | 'owner' | 'viewer'}
        resultsPerPage={results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            defaultOpen={false}
            placeholder="Number of admins"
            onSelect={val => {
              setResults(val);
            }}
          />
        }
        addNewOwnerModal={<AddUser orgId={organization.id} refetch={refetch} owners={organization.owners} />}
        editOwnerModal={user => <EditUser user={user} orgId={organization.id} refetch={refetch} />}
        deleteOwnerModal={user => (
          <DeleteUser user={user} orgId={organization.id} orgName={organization.name} refetch={refetch} />
        )}
      />
    </>
  );
}
