import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import UsersActions from 'cypress/support/actions/organizations/UsersAction';
import { aliasMutation, aliasQuery } from 'cypress/utils/aliasQuery';

const users = new UsersActions();
const group = new GroupAction();

describe('Org Users page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/users`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'removeUserFromGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
  });

  it('Creates a group', () => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/groups`);
    group.doAddGroup();
  });

  it('Add user', () => {
    users.doAddUser();
  });

  it('Delete user', () => {
    users.doDeleteUser();
  });

  after(() => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/groups`);
    group.doDeleteGroup();
    group.doDeleteGroup();
  });
});
