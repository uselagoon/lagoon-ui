export default class DeploymentsRepository {
  getDeployBtn() {
    return cy.getBySel('deploy-button');
  }

  getDeployments() {
    return cy.getBySel('deployment-row');
  }

  getNotification() {
    return cy.get('.ant-notification-notice');
  }

  getCancelBtn() {
    return this.getDeployments().first().getBySel('cancel-deployment');
  }

  getConfirmCancelBtn(){
    return cy.getBySel('confirm-cancellation');
  }

  getDeploymentTriggered() {
    return this.getNotification().should('contain.text', 'Deployment successfully triggered');
  }

  getResultSelector() {
    return cy.getBySel('select-results');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }
}
