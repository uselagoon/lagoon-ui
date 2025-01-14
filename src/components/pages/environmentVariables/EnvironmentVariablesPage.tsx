'use client';

import { Fragment, SetStateAction, useState } from 'react';

import { useRouter } from 'next/navigation';

import { EnvVariablesData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/[environmentSlug]/environment-variables/page';
import EnvironmentNotFound from '@/components/errors/EnvironmentNotFound';
import environmentByProjectNameWithEnvVarsValueQuery from '@/lib/query/environmentByProjectNameWithEnvVarsValueQuery';
import environmentProjectByProjectNameWithEnvVarsValueQuery from '@/lib/query/environmentProjectByProjectNameWithEnvVarsValueQuery';
import { EditOutlined } from '@ant-design/icons';
import { QueryRef, useLazyQuery, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { Button, Head2, LagoonFilter, Select, Table, useNotification } from '@uselagoon/ui-library';
import { Variable } from '@uselagoon/ui-library/dist/components/Table/VariablesTable/VariablesTable';
import { useQueryStates } from 'nuqs';

import { AddNewVariable } from '../../addNewVariable/AddNewVariable';
import { DeleteVariableModal } from '../../deleteVariable/DeleteVariableModal';
import { resultsFilterValues } from '../insights/_components/filterValues';
import { EditVariable } from '../projectVariables/_components/EditVariable';
import { scopeOptions, sortOptions } from './_components/filterValues';
import { EditProjectVariablesButton, Space } from './_components/styles';

const { VariablesTable } = Table;

type SortType = 'name_asc' | 'name_desc' | 'scope_asc' | 'scope_desc' | undefined;

export default function EnvironmentVariablesPage({
  queryRef,
  projectName,
  environmentName,
}: {
  queryRef: QueryRef<EnvVariablesData>;
  environmentName: string;
  projectName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);
  const router = useRouter();

  const [envAction, setEnvAction] = useState('');
  const [envValuesVisible, setEnvValuesVisible] = useState(false);
  const [projectVarsVisible, setProjectVarsVisible] = useState(false);

  const {
    data: { environmentVars },
  } = useReadQuery(queryRef);

  if (!environmentVars) {
    return <EnvironmentNotFound openshiftProjectName={environmentName} />;
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

  const variables = environmentVars.envVariables;
  const envName = environmentVars.name;

  const projectVariables = environmentVars.project.envVariables;

  const navToProjectVars = () => {
    router.push(`/projects/${projectName}/project-variables`);
  };

  const envVarsError = useNotification({
    type: 'error',
    title: 'Unauthorized',
    content: `You don't have permission to ${envAction} environment ${
      envAction === 'view' ? ' variable values' : 'variables'
    }. Contact your administrator to obtain the relevant permissions.`,
    requiresManualClose: true,
  });

  const projectVarsError = useNotification({
    type: 'error',
    title: 'Unauthorized',
    content:
      "You don't have permission to view project variable values. Contact your administrator to obtain the relevant permissions",
    requiresManualClose: true,
  });

  const [getEnvVarValues, { loading: envLoading, data: envValues }] = useLazyQuery(
    environmentByProjectNameWithEnvVarsValueQuery,
    {
      variables: { openshiftProjectName: environmentVars.openshiftProjectName },
      onError: err => {
        console.error(err);
        envVarsError.trigger();
        return err;
      },
      onCompleted: () => setEnvValuesVisible(true),
    }
  );

  const handleShowEnvVars = async () => {
    if (envValuesVisible) {
      setEnvValuesVisible(false);
      return;
    }

    await getEnvVarValues();
  };

  const [getPrjEnvVarValues, { loading: prjLoading, data: prjEnvValues }] = useLazyQuery(
    environmentProjectByProjectNameWithEnvVarsValueQuery,
    {
      variables: { openshiftProjectName: environmentVars.openshiftProjectName },
      onError: err => {
        console.error(err);
        projectVarsError.trigger();
      },
      onCompleted: () => setProjectVarsVisible(true),
    }
  );

  const handleShowProjectVars = async () => {
    if (projectVarsVisible) {
      setProjectVarsVisible(false);
      return;
    }
    await getPrjEnvVarValues();
  };

  const [checkEnvVars] = useLazyQuery(environmentByProjectNameWithEnvVarsValueQuery, {
    variables: { openshiftProjectName: environmentVars.openshiftProjectName },
    onError: err => {
      console.error(err);
      envVarsError.trigger();
      return err;
    },
  });

  const permissionCheck = async (action: 'add' | 'delete') => {
    setEnvAction(action);
    return await checkEnvVars();
  };

  return (
    <>
      <Fragment key="envVarsError-notification-holder">{envVarsError.contextHolder}</Fragment>
      <Fragment key="projectVarsError-notification-holder"> {projectVarsError.contextHolder}</Fragment>

      <Head2>Environment variables</Head2>

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

        <Button size="middle" loading={envLoading} onClick={handleShowEnvVars}>
          {envValuesVisible ? 'Hide values' : 'Show values'}
        </Button>
      </LagoonFilter>

      <VariablesTable
        type="environment"
        withValues={!envLoading && envValues?.environmentVars?.envVariables && envValuesVisible ? true : false}
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
          <EditVariable
            type="environment"
            environmentName={envName}
            currentEnv={currentVariable}
            projectName={projectName}
            refetch={refetch}
          />
        )}
        deleteVariableModal={currentVariable => (
          <DeleteVariableModal
            type="environment"
            onClick={() => permissionCheck('delete')}
            environmentName={envName}
            currentEnv={currentVariable}
            projectName={projectName}
            refetch={refetch}
          />
        )}
        newVariableModal={
          <AddNewVariable
            onClick={() => permissionCheck('add')}
            type="environment"
            projectName={projectName}
            environmentName={envName}
            refetch={refetch}
          />
        }
        variables={envValues?.environmentVars?.envVariables || (variables as unknown as Variable[])}
      />

      <Space />

      <Head2>Project variables</Head2>

      <Button size="middle" loading={prjLoading} onClick={handleShowProjectVars}>
        {projectVarsVisible ? 'Hide values' : 'Show values'}
      </Button>
      <Space />

      <VariablesTable
        type="project"
        withValues={
          !prjLoading && prjEnvValues?.environmentVars?.project?.envVariables && projectVarsVisible ? true : false
        }
        newVariableModal={
          <EditProjectVariablesButton onClick={() => navToProjectVars()}>
            <EditOutlined /> Edit Variables
          </EditProjectVariablesButton>
        }
        variables={prjEnvValues?.environmentVars?.project?.envVariables || (projectVariables as unknown as Variable[])}
        editVariableModal={() => null}
        deleteVariableModal={() => null}
      />
    </>
  );
}
