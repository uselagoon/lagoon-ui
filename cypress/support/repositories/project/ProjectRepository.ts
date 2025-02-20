export default class ProjectRepository {
  getGitUrl() {
    return cy.getBySel('git-url');
  }
  getCopyButton() {
    return cy.getBySel('copy-button');
  }
  getCreatedField() {
    return cy.getBySel('created');
  }
  getBranchesField() {
    return cy.getBySel('branches-enabled');
  }
  getPullRequestsField() {
    return cy.getBySel('pull-requests-enabled');
  }
  getDevEnvsField() {
    return cy.getBySel('development-environments-in-use');
  }

  getEnvBtn() {
    return cy.getBySel('create-environment');
  }

  getBranchNameInput() {
    return cy.getBySel('branch-name');
  }

  getNextStepButton() {
    return cy.getBySel('modal-confirm');
  }

  getNotification() {
    return cy.get('.ant-notification-notice');
  }

  getEnvNames() {
    return cy.getBySel('environment-row');
  }
}
