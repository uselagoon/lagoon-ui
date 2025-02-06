import { testData } from 'cypress/fixtures/variables';
import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import UsersActions from 'cypress/support/actions/organizations/UsersAction';
import { aliasMutation, aliasQuery, registerIdleHandler } from 'cypress/utils/aliasQuery';

const users = new UsersActions();
const group = new GroupAction();

describe('Org Users page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/users`);
    registerIdleHandler('idle');
    cy.waitForNetworkIdle('@idle', 1000);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'removeUserFromGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
    cy.waitForNetworkIdle('@idle', 1000);
  });

  it('Creates a group', () => {
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/groups`);
    cy.waitForNetworkIdle('@idle', 1000);
    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Adds a user to the group', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    users.doAddUser(testData.organizations.users.email);
  });

  it('Deletes user', () => {
    cy.waitForNetworkIdle('@idle', 1000);
    users.doDeleteUser(testData.organizations.users.email);
  });

  after(() => {
    cy.waitForNetworkIdle('@idle', 1000);
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/groups`);
    cy.waitForNetworkIdle('@idle', 1000);
    registerIdleHandler('groupQuery');
    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    cy.waitForNetworkIdle('@idle', 1000);
    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
  });
});
