import OverviewAction from 'cypress/support/actions/organizations/OverviewAction';

const overview = new OverviewAction();

describe('Organization overview page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);
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
