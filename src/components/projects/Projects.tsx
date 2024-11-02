'use client';

import { SetStateAction, useState } from 'react';

import { ProjectType, ProjectsData } from '@/app/(routegroups)/(projectroutes)/projects/(projects-page)/page';
import { LagoonFilter, Table } from '@uselagoon/ui-library';
import gitUrlParse from 'git-url-parse';
import { useQueryState } from 'nuqs';

const { ProjectsTable } = Table;

const safeParseGitUrl = (gitUrl: string) => {
  let parsed;

  try {
    parsed = gitUrlParse(gitUrl);
  } catch {
    parsed = '';
  }
  return parsed;
};
export default function ProjectsPage({ data }: { data: ProjectsData }) {
  const [search, setSearch] = useQueryState('search');

  const [numberOfitems, setNumberOfItems] = useState(0);

  const projectsWithOrigin = data.allProjects.map((project: ProjectType) => {
    const gitUrlParsed = safeParseGitUrl(project.gitUrl);
    const gitLink = typeof gitUrlParsed === 'object' ? `${gitUrlParsed.resource}/${gitUrlParsed.full_name}` : '';
    return {
      ...project,
      origin: gitLink,
    };
  });

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
              value: 10,
              label: '10 Results per page',
            },
            {
              value: 20,
              label: '20 Results per page',
            },
            {
              value: 50,
              label: '50 Results per page',
            },
          ],
          selectedState: numberOfitems,
          setSelectedState: setNumberOfItems as any,
        }}
      />
      <ProjectsTable
        projects={projectsWithOrigin}
        filterString={search || ''}
        resultsPerPage={numberOfitems}
        basePath="/projects"
      />
    </>
  );
}
