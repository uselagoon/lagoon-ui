import { gql } from '@apollo/client';

export default gql`
  query getEnvironment($openshiftProjectName: String!, $limit: Int) {
    environment: environmentByOpenshiftProjectName(openshiftProjectName: $openshiftProjectName) {
      id
      openshiftProjectName
      deployType
      deployBaseRef
      deployTitle
      project {
        id
        name
        problemsUi
        factsUi
      }
      backups(limit: $limit) {
        id
        source
        backupId
        created
        restore {
          id
          status
          restoreLocation
          restoreSize
        }
      }
    }
  }
`;