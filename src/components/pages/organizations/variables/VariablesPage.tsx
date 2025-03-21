'use client';

import { Fragment, SetStateAction, useCallback, useState } from 'react';

import { OrganizationVariablesData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/variables/page';
import { AddNewVariable } from '@/components/addNewVariable/AddNewVariable';
import { DeleteVariableModal } from '@/components/deleteVariable/DeleteVariableModal';
import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import organizationByNameWithEnvVarsValue from '@/lib/query/organizations/organizationByNameWithEnvVarsValue';
import { QueryRef, useLazyQuery, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Button, Head2, LagoonFilter, Select, Table, useNotification } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';
import { useQueryStates } from 'nuqs';

import { EditVariable } from '../../projectVariables/_components/EditVariable';
import { resultsFilterValues, scopeOptions, sortOptions } from './_components/filterValues';

const { VariablesTable } = Table;

type SortType = 'name_asc' | 'name_desc' | 'scope_asc' | 'scope_desc' | undefined;

export default function OrgVariablesPage({
  queryRef,
  organizationSlug,
}: {
  queryRef: QueryRef<OrganizationVariablesData>;
  organizationSlug: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const [envAction, setEnvAction] = useState('');
  const [orgValuesVisible, setOrgValuesVisible] = useState(false);
  const [projectVarsVisible, setProjectVarsVisible] = useState(false);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  if (!organization) {
    return <OrganizationNotFound orgName={organizationSlug} />;
  }

  const [{ results, search, sort, scope }, setQuery] = useQueryStates({
    results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
    sort: {
      defaultValue: null,
      parse: (value: string) => {
        if (['name_asc', 'name_desc', 'scope_asc', 'scope_desc'].includes(value)) return String(value);

        return null;
      },
    },

    scope: {
      defaultValue: undefined,
      parse: (value: string | undefined) => value as Variable['scope'],
    },
  });

  const setSearch = (val: string) => {
    setQuery({ search: val });
  };

  const setResults = (val: string) => {
    setQuery({ results: Number(val) });
  };

  const setScope = (val: Variable['scope']) => {
    setQuery({ scope: val });
  };

  const setSort = (val: string) => {
    setQuery({ sort: val });
  };

  const variables = organization.envVariables;

  const envVarsError = useNotification({
    type: 'error',
    title: 'Unauthorized',
    content: `You don't have permission to ${envAction} organization ${
      envAction === 'view' ? ' variable values' : 'variables'
    }. Contact your administrator to obtain the relevant permissions.`,
    requiresManualClose: true,
  });

  const [getOrgEnvVarValues, { loading: orgLoading, data: orgEnvValues }] = useLazyQuery(
    organizationByNameWithEnvVarsValue,
    {
      variables: { name: organization.name },
      onError: err => {
        console.error(err);
        envVarsError.trigger();
        return err;
      },
      onCompleted: () => setOrgValuesVisible(true),
    }
  );

  const permissionCheck = async (action: 'add' | 'delete' | 'view') => {
    setEnvAction(action);
    return await getOrgEnvVarValues();
  };

  const stableViewPermissionCheck = useCallback(() => permissionCheck('view'), []);

  const handleShowEnvVars = async () => {
    await stableViewPermissionCheck();

    if (orgValuesVisible) {
      setOrgValuesVisible(false);
      return;
    }

    await getOrgEnvVarValues();
  };

  const stableAddPermissionCheck = useCallback(() => permissionCheck('add'), []);
  const stableDeletePermissionCheck = useCallback(() => permissionCheck('delete'), []);

  return (
    <>
      <Fragment key="envVarsError-notification-holder">{envVarsError.contextHolder}</Fragment>

      <Head2>Organization variables</Head2>

      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
      >
        <Select
          options={sortOptions}
          value={sort}
          defaultOpen={false}
          placeholder="Sort by"
          onSelect={val => {
            setSort(val);
          }}
        />

        <Select
          options={scopeOptions}
          defaultOpen={false}
          value={scope}
          placeholder="Scope"
          onSelect={val => {
            setScope(val);
          }}
        />

        <Button size="middle" loading={orgLoading} onClick={handleShowEnvVars}>
          {orgValuesVisible ? 'Hide values' : 'Show values'}
        </Button>
      </LagoonFilter>

      <VariablesTable
        type="environment"
        withValues={!orgLoading && orgEnvValues?.organization?.envVariables && orgValuesVisible ? true : false}
        filterString={search}
        filterScope={scope as 'build' | 'runtime' | 'global' | 'container_registry' | 'internal_container_registry'}
        resultsPerPage={results}
        sortBy={sort as SortType}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            allowClear
            defaultOpen={false}
            placeholder="Number of variables"
            onSelect={(val: string) => {
              setResults(val);
            }}
          />
        }
        editVariableModal={currentVariable => (
          <EditVariable type="organization" orgName={organizationSlug} currentEnv={currentVariable} refetch={refetch} />
        )}
        deleteVariableModal={currentVariable => (
          <DeleteVariableModal
            type="organization"
            orgName={organizationSlug}
            onClick={() => stableDeletePermissionCheck}
            currentEnv={currentVariable}
            refetch={refetch}
          />
        )}
        newVariableModal={
          <AddNewVariable
            onClick={() => stableAddPermissionCheck}
            type="organization"
            orgName={organizationSlug}
            refetch={refetch}
          />
        }
        variables={orgEnvValues?.organization?.envVariables || (variables as unknown as Variable[])}
      />
    </>
  );
}
