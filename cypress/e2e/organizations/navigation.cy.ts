import { registerIdleHandler } from 'cypress/utils/aliasQuery';

describe('Org sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_platformowner"), Cypress.env("user_platformowner"));
    registerIdleHandler('idle');
  });

  it('Traverses sidebar nav from Groups -> Users -> Projects -> Notifications -> Manage', () => {
    cy.visit(`${Cypress.env("url")}/organizations/1`);

    context('From /org/id to /groups', () => {
      cy.waitForNetworkIdle('@idle', 500);

      cy.get('.groups').click();

      cy.location('pathname').should('equal', '/organizations/1/groups');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /groups to /users', () => {
      cy.get('.users').click();

      cy.location('pathname').should('equal', '/organizations/1/users');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /users to /projects', () => {
      cy.get('.projects').click();

      cy.location('pathname').should('equal', '/organizations/1/projects');
    });

    cy.waitForNetworkIdle('@idle', 500);
    context('From /projects to /notifications', () => {
      cy.get('.notifications').click();
      cy.location('pathname').should('equal', '/organizations/1/notifications');
    });
    cy.waitForNetworkIdle('@idle', 500);

    context('From /notifications to /manage', () => {
      cy.get('.manage').click();
      cy.location('pathname').should('equal', '/organizations/1/manage');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /manage to /overview', () => {
      cy.get('.overview').click();
      cy.location('pathname').should('equal', '/organizations/1');
    });
  });
});
