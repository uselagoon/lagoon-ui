import ManageAction from 'cypress/support/actions/organizations/ManageAction';

const manage = new ManageAction();

describe('Org Manage page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84/manage`);
  });

  it('Add a org viewer', () => {
    manage.doAddOrgViewer();
  });
  it('Upgrade/edit org viewer to owner', () => {
    manage.doEditOrgViewer();
  });
  it('Delete user', () => {
    manage.doDeleteUser();
  });
});
