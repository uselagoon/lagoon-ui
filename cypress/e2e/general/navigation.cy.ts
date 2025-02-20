import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));

    cy.visit(Cypress.env('url'));

    registerIdleHandler('idle');
  });

  it('Checks navigation to settings, organizations and projects pages', () => {
    context('Navigates from /projects to /settings', () => {
      
      cy.waitForNetworkIdle('@idle', 500);
      cy.getBySel('user-name').realHover();

      cy.getBySel('nav-settings').click();

      cy.location('pathname').should('equal', '/settings');
    });

    context('Navigates from /settings to /organizations', () => {
      cy.getBySel('nav-organizations').click();

      cy.location('pathname').should('equal', '/organizations');
    });

    context('Navigates from /organizations to /projects', () => {
      cy.getBySel('nav-projects').first().click();

      cy.location('pathname').should('equal', '/projects');
    });

    context('Navigates from /projects to /account', () => {

      cy.waitForNetworkIdle('@idle', 500);
      cy.getBySel('user-name').realHover();

      cy.getBySel('nav-account').invoke('removeAttr', 'target').click();

      const redirect = `${Cypress.env('keycloak')}/auth/realms/lagoon/account/`;

      cy.location('href').should('eq', redirect);
    });
  });
});
