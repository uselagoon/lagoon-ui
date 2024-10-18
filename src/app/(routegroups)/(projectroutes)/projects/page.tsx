import { Metadata } from 'next';

import { default as ProjectsList } from '@/components/projects/Projects';
import { gql } from '@apollo/client';

import { getClient } from '../../../../lib/apolloClient';

export const dynamic = 'force-dynamic';

const query = gql`
  query AllProjectsQuery {
    allProjects {
      id
      name
      environments(type: PRODUCTION) {
        route
      }
    }
  }
`;

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Projects() {
  const client = await getClient();

  const { data } = await client.query({ query });

  // await new Promise((res)=>{
  //   setTimeout(() => {
  //       res("")
  //   }, 5000);
  // })

  return <ProjectsList data={data} />;
}
