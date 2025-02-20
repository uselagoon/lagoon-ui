import DeploymentsRepository from 'cypress/support/repositories/deployments/DeploymentsRepository';

const deployments = new DeploymentsRepository();

export default class DeploymentsAction {
  doCancelDeployment() {
    deployments.getCancelBtn().first().click();

    deployments.getConfirmCancelBtn().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployments.getDeployments().first().contains('Cancelled');
  }

  doFailedCancelDeployment() {
    deployments.getCancelBtn().first().click();

    deployments.getConfirmCancelBtn().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployments.getNotification().should('exist').should('include.text', 'There was a problem cancelling deployment.');
  }

  doDeployment() {
    deployments.getDeployBtn().click();

    cy.wait('@gqldeployEnvironmentLatestMutation');

    deployments.getDeploymentTriggered().should('exist');
  }

  doFailedDeployment() {
    deployments.getDeployBtn().click();

    cy.wait('@gqldeployEnvironmentLatestMutation');

    deployments.getNotification().should('exist').should('include.text', 'There was a problem deploying.');
  }

  doChangeNumberOfResults(val: string | number) {
    deployments.getResultSelector().click();

    deployments.getResultMenu().find('div').get('.ant-select-item-option-content').contains(val).click({ force: true });

    const expectedLimit = val !== 'All' ? `?results=${val}` : '?results=-1';

    cy.location().should(loc => {
      expect(loc.search).to.eq(expectedLimit);
    });
  }
}
