import { testData } from 'cypress/fixtures/variables';
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

  it('Adds a group', () => {
    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Searches groups', () => {
    group.doGroupSearch(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Adds a member to a group', () => {
    group.doAddMemberToGroup(testData.organizations.users.email);
  });

  it('Deletes groups', () => {
    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
  });
});
