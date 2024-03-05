import DeploymentsAction from 'cypress/support/actions/deployments/DeploymentsAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

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

    cy.waitForNetworkIdle('@idle', 500);

    deployments.doResultsLimitedchangeCheck(10);
    cy.waitForNetworkIdle('@idle', 500);
    deployments.doResultsLimitedchangeCheck(25);
    cy.waitForNetworkIdle('@idle', 500);
    deployments.doResultsLimitedchangeCheck(50);
    cy.waitForNetworkIdle('@idle', 500);
    deployments.doResultsLimitedchangeCheck(100);
    cy.waitForNetworkIdle('@idle', 500);
    deployments.doResultsLimitedchangeCheck('all');
  });
});
