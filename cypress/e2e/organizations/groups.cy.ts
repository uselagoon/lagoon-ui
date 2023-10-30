import GroupAction from 'cypress/support/actions/organizations/GroupsAction';

const group = new GroupAction();

describe('Organization Groups page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84/groups`);
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

  it('Delete group', () => {
    group.doDeleteGroup();
  });
});
