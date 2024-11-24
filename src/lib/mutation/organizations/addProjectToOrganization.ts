import { gql } from '@apollo/client';

export default gql`
  mutation addProjectToOrganization(
    $organization: Int!
    $name: String!
    $gitUrl: String!
    $subfolder: String
    $kubernetes: Int!
    $branches: String
    $pullrequests: String
    $productionEnvironment: String!
    $developmentEnvironmentsLimit: Int
    $addOrgOwner: Boolean
  ) {
    addProject(
      input: {
        organization: $organization
        name: $name
        gitUrl: $gitUrl
        subfolder: $subfolder
        kubernetes: $kubernetes
        branches: $branches
        pullrequests: $pullrequests
        productionEnvironment: $productionEnvironment
        developmentEnvironmentsLimit: $developmentEnvironmentsLimit
        addOrgOwner: $addOrgOwner
      }
    ) {
      id
      name
    }
  }
`;
