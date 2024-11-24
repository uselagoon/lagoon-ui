import { gql } from '@apollo/client';

export default gql`
  mutation addGroupToOrganization($group: String!, $organization: Int!) {
    addGroupToOrganization(input: { name: $group, organization: $organization }) {
      name
    }
  }
`;
