import gql from 'graphql-tag';

export default gql`
  query getProjects($limit: Int, $skip: Int) {
    uiProjects(limit: $limit, skip: $skip) {
      id
      name
      gitUrl
    }
  }
`;
