import { testData } from 'cypress/fixtures/variables';
import ManageAction from 'cypress/support/actions/organizations/ManageAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const manage = new ManageAction();

describe('Org Manage page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/manage`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'AddAdminToOrganization');
    });
  });

  it('Adds a org viewer', () => {
    manage.doAddOrgViewer(testData.organizations.manage.user);
  });
  it('Should upgrade org viewer to admin', () => {
    manage.doEditOrgViewerToAdmin(testData.organizations.manage.user);
  });

  it('Should upgrade org admin to owner', () => {
    manage.doEditOrgViewerToOwner(testData.organizations.manage.user);
  });

  it('Deletes user', () => {
    manage.doDeleteUser(testData.organizations.manage.user);
  });
});
