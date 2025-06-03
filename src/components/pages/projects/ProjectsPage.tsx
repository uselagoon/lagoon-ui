'use client';

import { ProjectsData } from '@/app/(routegroups)/(projectroutes)/projects/(projects-page)/page';
import { Table, TableCaption } from '@uselagoon/ui-library';
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
    <div className="min-h-screen bg-cyan-50 flex justify-center">
      <Table className="border-red-500">
        <TableCaption className="text-3xl">Projects</TableCaption>
      </Table>
    </div>
  );
}
