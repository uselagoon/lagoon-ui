import ManageAction from 'cypress/support/actions/organizations/ManageAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const manage = new ManageAction();

describe('Org Manage page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/manage`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasMutation(req, "AddUserToOrganization");

    });


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
