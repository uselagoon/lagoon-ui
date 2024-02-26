import { registerIdleHandler } from "cypress/utils/aliasQuery";

describe('Initial login and theme spec', () => {
    beforeEach(() => {
      cy.login(Cypress.env("user_owner"), Cypress.env("user_owner"));
      registerIdleHandler("idle");
    });
  
    it('Logins and gets redirected to /projects with correct user displayed', () => {
      cy.visit(Cypress.env("url"));
  
      cy.location('pathname').should('equal', '/projects');
      cy.getBySel('headerMenu').should('contain', Cypress.env("user_owner"));
    });
  
    it('Switches themes', () => {
      cy.visit(Cypress.env("url"));
  
      cy.waitForNetworkIdle("@idle", 500);

      cy.getBySel('themeToggler').then($toggler => {
        if (localStorage.getItem('theme') === 'dark') {
          cy.wrap($toggler).click();
  
          cy.window().its('localStorage.theme').should('eq', 'light');
          // revert to dark
          cy.getBySel('themeToggler').click();
        } else {
          cy.wrap($toggler).click();
  
          cy.window().its('localStorage.theme').should('eq', 'dark');
        }
      });
    });
  
    it('Logs out', () => {
      cy.visit(Cypress.env("url"));
      cy.getBySel('headerMenu').click();
      cy.getBySel('logout').click();
  
      cy.origin(Cypress.env("keycloak"), () => {
        cy.contains('Sign in to your account');
      });
    });
  });
  