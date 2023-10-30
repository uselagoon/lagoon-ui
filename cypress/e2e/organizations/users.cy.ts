import UsersActions from 'cypress/support/actions/organizations/UsersAction';

const users = new UsersActions();

describe('Org Users page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84/users`);
  });

  it('Add user', () => {
    users.doAddUser();
  });

  it('Delete user', () => {
    users.doDeleteUser();
  });
});
