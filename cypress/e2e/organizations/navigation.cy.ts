describe('Org sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
  });

  it('Groups/Users/Projects/Notifications/Manage', () => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);

    context('From /org/id to /groups', () => {
      cy.wait(3500);

      cy.get('.groups').click();

      cy.location('pathname').should('equal', '/organizations/84/groups');
    });

    cy.wait(3500);

    context('From /groups to /users', () => {
      cy.get('.users').click();

      cy.location('pathname').should('equal', '/organizations/84/users');
    });

    cy.wait(3500);

    context('From /users to /projects', () => {
      cy.get('.projects').click();

      cy.location('pathname').should('equal', '/organizations/84/projects');
    });

    cy.wait(3500);
    context('From /projects to /notifications', () => {
      cy.get('.notifications').click();
      cy.location('pathname').should('equal', '/organizations/84/notifications');
    });
    cy.wait(3500);

    context('From /notifications to /manage', () => {
      cy.get('.manage').click();
      cy.location('pathname').should('equal', '/organizations/84/manage');
    });

    cy.wait(3500);

    context('From /manage to /overview', () => {
      cy.get('.overview').click();
      cy.location('pathname').should('equal', '/organizations/84');
    });
  });
});
