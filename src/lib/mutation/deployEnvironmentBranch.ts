import { gql } from '@apollo/client';

export default gql`
  mutation ($project: String!, $branch: String!) {
    deployEnvironmentBranch(input: { project: { name: $project }, branchName: $branch })
  }
`;
