'use client';

import { ProjectsData } from '@/app/(routegroups)/(projectroutes)/projects/(projects-page)/page';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@uselagoon/ui-library';
import { useQueryStates } from 'nuqs';

export default function ProjectsPage({ data }: { data: ProjectsData }) {
  const [{ results, search }, setQuery] = useQueryStates({
    results: {
      defaultValue: 10,
      parse: (value: string | undefined) => (value !== undefined ? Number(value) : 10),
    },
    search: {
      defaultValue: '',
      parse: (value: string | undefined) => (value !== undefined ? String(value) : ''),
    },
  });

  const setSearch = (str: string) => {
    setQuery({ search: str });
  };
  const setResults = (val: string) => {
    setQuery({ results: Number(val) });
  };

  return (
    <div className="bg-blue-50">
      <Table className="w-[50vw] !mx-auto">
        <TableHeader>
          <TableCaption className="text-3xl">Projects</TableCaption>
          <TableRow>
            <TableHead className="">Project name</TableHead>
            <TableHead>Creation date</TableHead>
            <TableHead>Environments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.allProjects.map(project => {
            return (
              <TableRow>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.created}</TableCell>
                <TableCell>{project.environments.length}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
