import { registerIdleHandler } from 'cypress/utils/aliasQuery';

describe('Org sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    registerIdleHandler('idle');
  });

  it('Groups/Users/Projects/Notifications/Manage', () => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/99`);

    context('From /org/id to /groups', () => {
      cy.waitForNetworkIdle('@idle', 500);

      cy.get('.groups').click();

      cy.location('pathname').should('equal', '/organizations/99/groups');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /groups to /users', () => {
      cy.get('.users').click();

      cy.location('pathname').should('equal', '/organizations/99/users');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /users to /projects', () => {
      cy.get('.projects').click();

      cy.location('pathname').should('equal', '/organizations/99/projects');
    });

    cy.waitForNetworkIdle('@idle', 500);
    context('From /projects to /notifications', () => {
      cy.get('.notifications').click();
      cy.location('pathname').should('equal', '/organizations/99/notifications');
    });
    cy.waitForNetworkIdle('@idle', 500);

    context('From /notifications to /manage', () => {
      cy.get('.manage').click();
      cy.location('pathname').should('equal', '/organizations/99/manage');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /manage to /overview', () => {
      cy.get('.overview').click();
      cy.location('pathname').should('equal', '/organizations/99');
    });
  });
});
