export default class DeploymentRepository {
  getCancelDeploymentBtn() {
    return cy.getBySel('cancel-deployment');
  }

  getConfirmCancelBtn() {
    return cy.getBySel('confirm-cancellation');
  }

  getDeploymentRow() {
    return cy.getBySel('deployment-row');
  }

  getToggler() {
    return cy.getBySel('logviewer-toggle');
  }

  getLogViewer() {
    return cy.get('.log-viewer');
  }
  getAccordionHeadings() {
    return cy.get('.accordion-heading');
  }

  getNotification() {
    return cy.get('.ant-notification-notice');
  }
}
