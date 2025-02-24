import { testData } from 'cypress/fixtures/variables';
import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import UsersActions from 'cypress/support/actions/organizations/UsersAction';
import { aliasMutation, aliasQuery } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

const users = new UsersActions();
const group = new GroupAction();

describe('Org Users page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/users`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'removeUserFromGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });
    registerIdleHandler('idle');
  });

  it('Creates a group', () => {
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/groups`);
    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
  });

  it('Adds a user to the group', () => {
    users.doAddUser(testData.organizations.users.email);
  });

  it('Deletes user', () => {
    cy.waitForNetworkIdle('@idle', 500);
    users.doDeleteUser(testData.organizations.users.email);
  });

  after(() => {
    registerIdleHandler('groupQuery');
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/groups`);
    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
  });
});
