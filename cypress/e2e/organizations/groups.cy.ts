import { testData } from 'cypress/fixtures/variables';
import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import { aliasMutation, aliasQuery, registerIdleHandler } from 'cypress/utils/aliasQuery';

const group = new GroupAction();

describe('Organization Groups page', () => {
  beforeEach(() => {
    // register interceptors/idle handler
    cy.intercept('POST', Cypress.env('api'), req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
    registerIdleHandler('groupQuery');
    registerIdleHandler('idle');

    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/groups`);
  });

  it('Adds a group', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Searches groups', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    group.doGroupSearch(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Adds a member to a group', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    group.doAddMemberToGroup(testData.organizations.users.email, testData.organizations.groups.newGroupName);
  });

  it('Deletes groups', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    cy.waitForNetworkIdle('@idle', 1000);
    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
  });
});
