import { gql } from '@apollo/client';

export default gql`
  query getEnvironment($openshiftProjectName: String!, $limit: Int) {
    environment: environmentByOpenshiftProjectName(openshiftProjectName: $openshiftProjectName) {
      id
      name
      openshiftProjectName
      project {
        id
        name
        problemsUi
        factsUi
        environments {
          id
          name
        }
      }
      services {
        name
      }
      advancedTasks {
        ... on AdvancedTaskDefinitionCommand {
          id
          type
          name
          description
          environment
          project
          service
          created
          deleted
          confirmationText
          advancedTaskDefinitionArguments {
            id
            name
            displayName
            type
            range
            defaultValue
            optional
          }
        }
        ... on AdvancedTaskDefinitionImage {
          id
          type
          name
          description
          environment
          project
          service
          created
          deleted
          confirmationText
          advancedTaskDefinitionArguments {
            id
            name
            displayName
            type
            range
            defaultValue
            optional
          }
        }
      }
      tasks(limit: $limit) {
        id
        name
        taskName
        status
        created
        started
        completed
        service
        adminOnlyView
      }
    }
  }
`;
