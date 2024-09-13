
import Image from 'next/image';

import Test from '../components/test';

import { getClient } from "../lib/apolloClient";

import { gql } from "@apollo/client";
import { headers } from 'next/headers';


export const dynamic = "force-dynamic";

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

export default async function Home(props) {

  const { data } = await (await getClient()).query({ query });
  console.warn(data);

  return (
    <div>
    {data.allProjects.map((project)=>{
     return <div>{project.name}</div>
    })}
    </div>
  );
}
