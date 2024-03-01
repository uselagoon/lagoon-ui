import BackupsAction from 'cypress/support/actions/backups/BackupsAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const backups = new BackupsAction();

describe('Backups page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Retrieves a backup', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/backups`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'addRestore');
    });

    cy.waitForNetworkIdle('@idle', 500);

    backups.doRetrieveBackup();
  });

  it('Changes shown results', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

    cy.waitForNetworkIdle('@idle', 500);
    backups.doResultsLimitedchangeCheck(10);
    cy.waitForNetworkIdle('@idle', 500);
    backups.doResultsLimitedchangeCheck(25);
    cy.waitForNetworkIdle('@idle', 500);
    backups.doResultsLimitedchangeCheck(50);
    cy.waitForNetworkIdle('@idle', 500);
    backups.doResultsLimitedchangeCheck(100);
    cy.waitForNetworkIdle('@idle', 500);
    backups.doResultsLimitedchangeCheck('all');
  });
});
