import { gql } from '@apollo/client';

export default gql`
  mutation updateOrganizationFriendlyName($id: Int!, $description: String!) {
    updateOrganization(input: { id: $id, patch: { description: $description } }) {
      id
      name
      description
    }
  }
`;
