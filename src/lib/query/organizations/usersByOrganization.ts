import { gql } from '@apollo/client';

export default gql`
  query usersByOrganization($id: Int!) {
    users: usersByOrganization(organization: $id) {
      id
      firstName
      lastName
      email
      groupRoles {
        id
        role
      }
    }
  }
`;
