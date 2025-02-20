import EnvOverviewAction from 'cypress/support/actions/envOverview/EnvOverviewAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const environmentOverview = new EnvOverviewAction();

describe('Environment page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
  });

  it('Checks environment details', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

    environmentOverview.doEnvTypeCheck();

    environmentOverview.doDeployTypeCheck();

    environmentOverview.doSourceCheck();

    environmentOverview.doRoutesCheck();
  });

  it('Deletes the environment', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'deleteEnvironment');
    });

    environmentOverview.doDeleteEnvironment('main');
  });
});
