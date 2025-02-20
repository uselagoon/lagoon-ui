import deploymentAction from 'cypress/support/actions/deployment/DeploymentAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

const deployment = new deploymentAction();

describe('Deployment page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Cancels a deployment', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'cancelDeployment');
    });
    cy.waitForNetworkIdle('@idle', 500);

    deployment.navigateToRunningDeployment();

    cy.waitForNetworkIdle('@idle', 500);

    deployment.doCancelDeployment();
  });

  it('Toggles logviewer parsed/raw', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.waitForNetworkIdle('@idle', 500);

    deployment.navigateToRunningDeployment();
    deployment.doToggleLogViewer();
  });

  it('Checks accordion headings toggling content', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.waitForNetworkIdle('@idle', 500);
    deployment.navigateToRunningDeployment();
    deployment.doLogViewerCheck();
  });
});
