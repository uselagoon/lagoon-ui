'use client';

import { SetStateAction, memo, useState } from 'react';

import { ProjectData } from '@/app/(routegroups)/(projectroutes)/projects/[projectSlug]/(project-overview)/page';
import { QueryRef, useQueryRefHandlers, useReadQuery } from '@apollo/client';
import { IconGrid, IconList, LagoonFilter } from '@uselagoon/ui-library';
import { useQueryState } from 'nuqs';

import { CardView } from './_components/CardView';
import { TableView } from './_components/TableView';
import { StyledGridIcon, StyledListIcon, StyledToggle } from './styles';

export default function ProjectEnvironments({
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

  const [search, setSearch] = useQueryState('search');
  const [numberOfitems, setNumberOfItems] = useState(5);
  const [listView, setListView] = useState(false);

  const commonProps = {
    project,
    projectName,
    refetch,
    resultsPerPage: numberOfitems,
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
          options: [
            {
              value: 5,
              label: '5 Results per page',
            },
            {
              value: 10,
              label: '10 Results per page',
            },
            {
              value: 50,
              label: '50 Results per page',
            },
          ],
          selectedState: numberOfitems,
          setSelectedState: setNumberOfItems as any,
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
