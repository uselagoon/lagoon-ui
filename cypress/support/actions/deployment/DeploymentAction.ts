import DeploymentRepository from 'cypress/support/repositories/deployment/DeploymentRepository';

const deployment = new DeploymentRepository();

export default class deploymentAction {
  doCancelDeployment() {
    deployment.getCancelDeploymentBtn().first().click();

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
    cy.get('body').then($body => {
      if ($body.find('.accordion-heading').length > 0) {
        // parsing went ok
        cy.get('.accordion-heading')
          .each(($heading, index, $headings) => {
            if (index < $headings.length - 1) {
              cy.wrap($heading).click();
            }
          })
          .then($headings => {
            for (let i = 0; i < $headings.length - 1; i++) {
              cy.wrap($headings.eq(i))
                .next()
                .next()
                .getBySel('section-details')
                .then($sectionDetails => {
                  if ($sectionDetails.find('.log-text').length > 0) {
                    cy.wrap($sectionDetails).find('.log-text').should('exist');
                  } else {
                    cy.wrap($sectionDetails).find('.log-viewer').should('not.be.empty');
                  }
                });
            }
          });
      } else {
        // parsing failed
        cy.get('.log-viewer').should('not.be.empty');
      }
    });
  }
  navigateToRunningDeployment() {
    cy.getBySel('deployment-row').getBySel('running').first().click();
  }
}
