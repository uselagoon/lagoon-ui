import BackupsAction from 'cypress/support/actions/backups/BackupsAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

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

  it.only('Changes shown backup results', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/backups`);
    cy.waitForNetworkIdle('@idle', 500);

    backups.doChangeNumberOfResults(10);

    backups.doChangeNumberOfResults(25);

    backups.doChangeNumberOfResults(50);

    backups.doChangeNumberOfResults(100);

    backups.doChangeNumberOfResults('All');
  });
});
