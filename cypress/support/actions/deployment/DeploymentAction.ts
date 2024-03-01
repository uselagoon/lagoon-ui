import DeploymentRepository from 'cypress/support/repositories/deployment/DeploymentRepository';

const deployment = new DeploymentRepository();

export default class deploymentAction {
  doCancelDeployment() {
    deployment.getCancelDeploymentBtn().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployment.getCancelDeploymentBtn().should('have.text', 'Cancellation requested');
  }

  doToggleLogViewer() {
    deployment.getToggler().click();

    deployment.getLogViewer().should($viewer => {
      expect($viewer).to.have.length(1);

      // only text node
      expect($viewer.contents().length).to.equal(1);
      expect($viewer.contents().first().get(0).nodeType).to.equal(Node.TEXT_NODE);
    });

    // revert back to parsed
    deployment.getToggler().click();

    deployment.getLogViewer().should($viewer => {
      expect($viewer).to.have.length(1);

      expect($viewer.find('.processed-logs')).to.exist;
    });
  }

  doFailedCancelDeployment() {
    deployment.getCancelDeploymentBtn().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployment
      .getErrorNotification()
      .should('exist')
      .should('include.text', 'There was a problem cancelling deployment.');
  }
  doLogViewerCheck() {
    deployment.getAccordionHeadings().then($headings => {
      for (let i = 0; i < $headings.length - 1; i++) {
        cy.wrap($headings.eq(i)).click();
      }

      for (let i = 0; i < $headings.length - 1; i++) {
        cy.wrap($headings.eq(i)).next().next().getBySel('section-details').getBySel('log-text').should('exist');
      }
    });
  }
  navigateToRunningDeployment() {
    cy.getBySel('deployment-row').getBySel('running').first().click();
  }
}
