export default class DeploymentRepository {
  getCancelDeploymentBtn() {
    return cy.getBySel('cancelDeployment');
  }
  getToggler() {
    return cy.getBySel('logviewer_toggle');
  }
  getLogViewer() {
    return cy.get('.log-viewer');
  }
  getAccordionHeadings() {
    return cy.get('.accordion-heading');
  }

  getRunningDeployment() {
    return cy.getBySel('deploy');
  }
  getCompletedDeployment() {
    return cy.getBySel('deploy_result');
  }

  getErrorNotification() {
    return cy.get('.ant-notification-notice');
  }
}
