'use client';

import { SetStateAction } from 'react';

import { EnvVariablesData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/environment-variables/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Head2, LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';
import { useQueryStates } from 'nuqs';

import { AddNewVariable } from '../../addNewVariable/AddNewVariable';
import { DeleteVariableModal } from '../../deleteVariable/DeleteVariableModal';
import { resultsFilterValues } from '../insights/_components/filterValues';
import { EditVariable } from '../projectVariables/_components/EditVariable';
import { scopeOptions, sortOptions } from './_components/filterValues';

const { VariablesTable } = Table;
export default function EnvironmentVariablesPage({
  queryRef,
  environmentName,
  projectName,
}: {
  queryRef: QueryRef<EnvVariablesData>;
  environmentName: string;
  projectName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { environmentVars },
  } = useReadQuery(queryRef);

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
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
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

  const variables = environmentVars.envVariables;

  return (
    <>
      <Head2>Environment variables</Head2>

      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: sortOptions,
          selectedState: sort,
          setSelectedState: setSort as React.Dispatch<SetStateAction<unknown>>,
        }}
        sortOptions={{
          options: scopeOptions,
          selectedState: scope,
          setSelectedState: setScope as React.Dispatch<SetStateAction<unknown>>,
        }}
      ></LagoonFilter>

      <VariablesTable
        type="environment"
        filterString={search}
        filterScope={scope as 'build' | 'runtime' | 'global' | 'container_registry' | 'internal_container_registry'}
        resultsPerPage={results}
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
          <EditVariable
            type="environment"
            environmentName={environmentName}
            currentEnv={currentVariable}
            projectName={projectName}
            refetch={refetch}
          />
        )}
        deleteVariableModal={currentVariable => (
          <DeleteVariableModal
            type="environment"
            environmentName={environmentName}
            currentEnv={currentVariable}
            projectName={projectName}
            refetch={refetch}
          />
        )}
        newVariableModal={
          <AddNewVariable
            type="environment"
            projectName={projectName}
            environmentName={environmentName}
            refetch={refetch}
          />
        }
        variables={variables as unknown as Variable[]}
      />
    </>
  );
}