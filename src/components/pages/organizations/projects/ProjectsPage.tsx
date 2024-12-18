'use client';

import { SetStateAction } from 'react';

import { usePathname } from 'next/navigation';

import { OrganizationProjectsData } from '@/app/(routegroups)/(orgroutes)/organizations/[organizationSlug]/projects/(projects-page)/page';
import { CreateProject } from '@/components/createProject/CreateProject';
import OrganizationNotFound from '@/components/errors/OrganizationNotFound';
import { DeleteOutlined } from '@ant-design/icons';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { LagoonFilter, Select, Table } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { projectFilterOptions } from '../group/_components/filterValues';
import { RemoveProject } from './_components/RemoveProject';
import { resultsFilterValues } from './_components/filterOptions';

const { OrgProjectsTable } = Table;

export default function OrgProjectsPage({
  queryRef,
  organizationSlug,
}: {
  queryRef: QueryRef<OrganizationProjectsData>;
  organizationSlug: string;
}) {
  const [{ results, project_query, project_sort }, setQuery] = useQueryStates({
    results: {
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

  const setResults = (val: number) => {
    setQuery({ results: val });
  };

  const setProjectQuery = (str: string) => {
    setQuery({ project_query: str });
  };
  const setProjectSort = (val: string) => {
    if (['name_asc', 'name_desc', 'groupCount_asc', 'groupCount_desc'].includes(val)) {
      setQuery({ project_sort: val });
    } else {
      setQuery({ project_sort: null });
    }
  };

  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { organization },
  } = useReadQuery(queryRef);

  if (!organization) {
    return <OrganizationNotFound orgName={organizationSlug} />;
  }

  const pathname = usePathname();

  const deployTargetOptions = organization.deployTargets.map(deploytarget => {
    return { label: deploytarget.name, value: deploytarget.id };
  });
  return (
    <>
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

      <OrgProjectsTable
        type="standalone"
        projects={organization.projects}
        basePath={pathname}
        sortBy={project_sort as 'name_asc' | 'name_desc' | 'groupCount_asc' | 'groupCount_desc'}
        filterString={project_query}
        resultsPerPage={results ?? resultsFilterValues[0].value}
        resultDropdown={
          <Select
            options={resultsFilterValues}
            value={results}
            defaultOpen={false}
            placeholder="Number of projects"
            onSelect={val => {
              setResults(val);
            }}
          />
        }
        newProjectModal={
          <CreateProject
            organizationId={organization.id}
            options={deployTargetOptions}
            variant="small"
            refetch={refetch}
          />
        }
        deleteProjectModal={project => <RemoveProject project={project} refetch={refetch} />}
      />
    </>
  );
}
