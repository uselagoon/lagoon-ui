'use client';

import { SetStateAction } from 'react';

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

  const [{ search, env_count, view }, setQuery] = useQueryStates({
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },

    env_count: {
      defaultValue: 5,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 5),
    },
    view: {
      defaultValue: 'card',
      parse: (value: string | undefined) => {
        if (value === 'list') {
          return 'list';
        }
        return 'card'; // default to 'card' for undefined or any value other than 'list'
      },
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };

  const setEnvCount = (val: string) => {
    setQuery({ env_count: Number(val) });
  };

  const setView = (val: 'card' | 'list') => {
    setQuery({ view: val });
  };

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
        {/* <StyledToggle onClick={() => setView('card')}>
          <StyledGridIcon className={view === 'card' ? 'active' : ''} />
          Card View
        </StyledToggle> */}
        {/* 
        <StyledToggle onClick={() => setView('list')}>
          <StyledListIcon className={view === 'list' ? 'active' : ''} />
          List View
        </StyledToggle> */}
      </LagoonFilter>

      {/* {view === 'list' ? <TableView {...commonProps} /> : <CardView {...commonProps} />} */}
      <TableView {...commonProps} />
    </>
  );
}
