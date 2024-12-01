import { gql } from '@apollo/client';

export default gql`
  mutation deleteProject($project: String!) {
    deleteProject(input: { project: $project })
  }
`;
