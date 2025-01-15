'use client';

import { SetStateAction, useState } from 'react';

import { ProjectData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import ProjectNotFound from '@/components/errors/ProjectNotFound';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { LagoonFilter } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

import { CardView } from './_components/CardView';
import { TableView } from './_components/TableView';
import { envFilterValues } from './_components/filterValues';
import { StyledGridIcon, StyledListIcon, StyledToggle } from './styles';

export default function ProjectEnvironmentsPage({
  queryRef,
  projectName,
}: {
  queryRef: QueryRef<ProjectData>;
  projectName: string;
}) {
  const { refetch } = useQueryRefHandlers(queryRef);

  const {
    data: { project },
  } = useReadQuery(queryRef);

  if (!project) {
    return <ProjectNotFound projectName={projectName} />;
  }

  const [{ search, env_count }, setQuery] = useQueryStates({
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },

    env_count: {
      defaultValue: 5,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 5),
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };

  const setEnvCount = (val: string) => {
    setQuery({ env_count: Number(val) });
  };

  const [listView, setListView] = useState(false);

  const commonProps = {
    project,
    projectName,
    refetch,
    resultsPerPage: env_count,
    setResultsPerPage: setEnvCount,
    filterString: search || '',
  };

  return (
    <>
      <LagoonFilter
        searchOptions={{
          searchText: search || '',
          setSearchText: setSearch as React.Dispatch<SetStateAction<string>>,
        }}
        selectOptions={{
          options: envFilterValues,
          selectedState: env_count,
          setSelectedState: setEnvCount as React.Dispatch<SetStateAction<unknown>>,
        }}
      >
        <StyledToggle onClick={() => setListView(false)}>
          <StyledGridIcon className={listView ? '' : 'active'} />
          Card View
        </StyledToggle>

        <StyledToggle onClick={() => setListView(true)}>
          <StyledListIcon className={listView ? 'active' : ''} />
          List View
        </StyledToggle>
      </LagoonFilter>

      {listView ? <TableView {...commonProps} /> : <CardView {...commonProps} />}
    </>
  );
}
