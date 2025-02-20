import DeploymentsAction from 'cypress/support/actions/deployments/DeploymentsAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

const deployments = new DeploymentsAction();

describe('Deployments page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Does a deployment', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'deployEnvironmentLatest');
    });

    deployments.doDeployment();
  });

  it('Cancels a deployment', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'cancelDeployment');
    });
    cy.waitForNetworkIdle('@idle', 500);

    deployments.doCancelDeployment();
  });

  it('Changes shown results', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    deployments.doChangeNumberOfResults(10);

    deployments.doChangeNumberOfResults(25);

    deployments.doChangeNumberOfResults(50);

    deployments.doChangeNumberOfResults(100);

    deployments.doChangeNumberOfResults('All');
  });
});
