'use client';

import { gql, useQuery } from '@apollo/client';

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

export default function Knowledge() {
  const q = useQuery(query);

  console.warn(q);
  return <>Knowledge base</>;
}
