import gql from 'graphql-tag';

export default gql`
  query ubm($email: String!, $organization: Int!) {
    userByEmailAndOrganization(email: $email, organization: $organization) {
      email
      groupRoles {
        id
        name
        role
      }
    }
  }
`;
