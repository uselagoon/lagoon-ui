import { headers } from 'next/headers';

import { gql } from '@apollo/client';

import Test from '../components/test';
import { getClient } from '../lib/apolloClient';

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

export default async function Home() {
  const { data } = await (await getClient()).query({ query });

  return (
    <div>
      <Test />
      {data.allProjects.map((project: any) => {
        return (
          <div key={project.id} style={{ color: '#fff' }}>
            {project.name}
          </div>
        );
      })}
    </div>
  );
}
