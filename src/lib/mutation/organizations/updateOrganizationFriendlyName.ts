import { gql } from '@apollo/client';

export default gql`
  mutation updateOrganizationFriendlyName($id: Int!, $friendlyName: String!) {
    updateOrganization(input: { id: $id, patch: { friendlyName: $friendlyName } }) {
      id
      name
      friendlyName
    }
  }
`;
