export default class DeploymentsRepository {
  getDeployBtn() {
    return cy.getBySel('deploy');
  }
  getDeployQueued(){
    return cy.getBySel("deploy_result");
  }
  getDeployments(){
    return cy.getBySel("deploy-table");
  }
  getCancelBtn() {
    return this.getDeployments().getBySel("deployment-row").first().getBySel("cancel-button")
  }
  getResultsLimited() {
    return cy.getBySel('resultsLimited');
  }
  getResultsSelector() {
    return cy.getBySel('result_selector');
  }
  getErrorNotification() {
    return cy.get('.ant-notification-notice');
  }
}
