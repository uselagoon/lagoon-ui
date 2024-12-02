import { gql } from '@apollo/client';

export default gql`
  mutation addProjectToGroup($groupName: String!, $projectName: String!) {
    addGroupsToProject(input: { groups: { name: $groupName }, project: { name: $projectName } }) {
      name
    }
  }
`;
