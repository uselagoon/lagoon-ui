import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import { aliasMutation, aliasQuery, registerIdleHandler } from 'cypress/utils/aliasQuery';

const group = new GroupAction();

describe('Organization Groups page', () => {
  beforeEach(() => {
    // register interceptors/idle handler
    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
    registerIdleHandler('groupQuery');

    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/groups`);
  });

  it('Add a group', () => {
    group.doAddGroup();
  });

  it('Search groups', () => {
    group.doGroupSearch();
  });

  it('Add member to group', () => {
    group.doAddMemberToGroup();
  });

  it('Delete groups', () => {
    group.doDeleteGroup();
    group.doDeleteGroup();
  });
});
