import { gql } from '@apollo/client';

export default gql`
  query ubm($email: String!, $organization: Int!) {
    userByEmailAndOrganization(email: $email, organization: $organization) {
      email
      groupRoles {
        id
        name
        role
        groupType
      }
    }
  }
`;
