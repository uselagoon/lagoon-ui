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

export default async function Projects() {
  const { data } = await (await getClient()).query({ query });

  return (
    <div>
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
