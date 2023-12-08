import { registerIdleHandler } from 'cypress/utils/aliasQuery';

describe('Org sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_platformowner"), Cypress.env("user_platformowner"));
    registerIdleHandler('idle');
  });

  it('Traverses sidebar nav from Groups -> Users -> Projects -> Notifications -> Manage', () => {
    cy.visit(`${Cypress.env("url")}/organizations/lagoon-demo-organization`);

    context('From /org/id to /groups', () => {
      cy.waitForNetworkIdle('@idle', 500);

      cy.get('.groups').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/groups');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /groups to /users', () => {
      cy.get('.users').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/users');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /users to /projects', () => {
      cy.get('.projects').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/projects');
    });

    cy.waitForNetworkIdle('@idle', 500);
    context('From /projects to /notifications', () => {
      cy.get('.notifications').click();
      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/notifications');
    });
    cy.waitForNetworkIdle('@idle', 500);

    context('From /notifications to /manage', () => {
      cy.get('.manage').click();
      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/manage');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /manage to /overview', () => {
      cy.get('.overview').click();
      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization');
    });
  });
});
