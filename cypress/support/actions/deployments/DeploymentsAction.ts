import DeploymentsRepository from 'cypress/support/repositories/deployments/DeploymentsRepository';

const deployments = new DeploymentsRepository();

export default class DeploymentsAction {
  doCancelDeployment() {
    deployments.getCancelBtn().first().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployments.getCancelBtn().first().should('have.text', 'Cancelled');
  }
  doFailedCancelDeployment(){

    deployments.getCancelBtn().first().click();

    cy.wait('@gqlcancelDeploymentMutation');

    deployments.getErrorNotification().should('exist').should('include.text', 'There was a problem cancelling deployment.');
  }

  doDeployment() {
    deployments.getDeployBtn().click();

    cy.wait('@gqldeployEnvironmentLatestMutation');

    deployments.getDeployQueued().should('exist');
  }

  doFailedDeployment() {
    deployments.getDeployBtn().click();

    cy.wait('@gqldeployEnvironmentLatestMutation');

    deployments.getErrorNotification().should('exist').should('include.text', 'There was a problem deploying.');
  }

  doResultsLimitedchangeCheck(val: string | number) {
    const vals = {
      10: 0,
      25: 1,
      50: 2,
      100: 3,
      all: 4,
    };
    cy.getBySel('select-results').find("div").eq(6).click({ force: true });

    cy.get(`[id^="react-select-"][id$=-option-${vals[val]}]`).click();

    if (val !== 'all') {
      deployments
        .getResultsLimited()
        .invoke('text')
        .should('be.eq', `Number of results displayed is limited to ${val}`);
    } else {
      cy.location().should(loc => {
        expect(loc.search).to.eq('?limit=-1');
      });
    }
  }
}
