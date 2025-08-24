import gql from 'graphql-tag';

export default gql`
  query ubm($email: String!, $organization: Int!) {
    userByEmailAndOrganization(email: $email, organization: $organization) {
      email
      has2faEnabled
      isFederatedUser
      groupRoles {
        id
        name
        role
        groupType
      }
    }
  }
`;
