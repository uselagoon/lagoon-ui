export default class ProjectRepository {
  getGitUrl() {
    return cy.getBySel('gitLink');
  }
  getCopyButton() {
    return cy.getBySel('copyButton');
  }
  getCreatedField() {
    return cy.getBySel('created');
  }
  getBranchesField() {
    return cy.getBySel('branches');
  }
  getPullRequestsField() {
    return cy.getBySel('pullRequests');
  }
  getDevEnvsField() {
    return cy.getBySel('devEnvs');
  }
  getEnvBtn() {
    return cy.getBySel('createEnvironment');
  }
  getBranchNameInput() {
    return cy.getBySel('branchName');
  }
  getSubmitBtn() {
    return cy.getBySel('create-env');
  }
  getErrorNotification() {
    return cy.get('.ant-notification-notice');
  }

  getErrorModal() {
    return cy.get('.ReactModal__Content');
  }

  getEnvRoutes() {
    return cy.getBySel('route-label');
  }
  getEnvNames() {
    return cy.getBySel('environment-name');
  }
}
