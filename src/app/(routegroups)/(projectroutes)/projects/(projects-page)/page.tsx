import { Metadata } from 'next';

import ProjectsPage from '@/components/pages/projects/ProjectsPage';
import { getClient } from '@/lib/apolloClient';
import allProjectsQuery from '@/lib/query/allProjectsQuery';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
};

export type ProjectType = {
  id: number;
  name: string;
  problemsUi: number | null;
  factsUi: number | null;
  created: string;
  gitUrl: string;
  kubernetes: {
    id: number;
    name: string;
    cloudRegion: string | null;
  };
  environments: [
    {
      route: string;
      updated: string;
    }
  ];
};
export type ProjectsData = {
  allProjects: ProjectType[];
};
export default async function Projects() {
  const client = await getClient();

  const { data } = await client.query<ProjectsData>({ query: allProjectsQuery });

  return <ProjectsPage data={data} />;
}
