import OverviewAction from 'cypress/support/actions/organizations/OverviewAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const overview = new OverviewAction();

describe('Organization overview page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasMutation(req, 'updateOrganizationFriendlyName');
    });
  });

  it('Check navigation links', () => {
    overview.doNavLinkCheck();
  });

  it('Check quota fields', () => {
    // groups, projects, notifications, envs
    overview.doQuotaFieldCheck();
  });

  it('Change org friendlty name/description', () => {
    overview.changeOrgFriendlyname();

    overview.changeOrgDescription();
  });
});
