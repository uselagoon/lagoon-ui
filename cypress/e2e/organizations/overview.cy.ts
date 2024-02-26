import { testData } from 'cypress/fixtures/variables';
import OverviewAction from 'cypress/support/actions/organizations/OverviewAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const overview = new OverviewAction();

describe('Organization overview page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'updateOrganizationFriendlyName');
    });
  });

  it('Checks navigation links', () => {
    overview.doNavLinkCheck();
  });

  it('Checks quota fields', () => {
    // groups, projects, notifications, envs
    overview.doQuotaFieldCheck();
  });

  it.only('Changes org friendly name/description', () => {
    registerIdleHandler('idle');

    overview.changeOrgFriendlyname(testData.organizations.overview.friendlyName);

    cy.waitForNetworkIdle('@idle', 500);
    overview.changeOrgDescription(testData.organizations.overview.description);
  });
});
