describe('Initial login and theme spec', () => {
    beforeEach(() => {
      cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    });
  
    it('Logins and gets redirected to /projects with correct user displayed', () => {
      cy.visit(Cypress.env().CY_URL);
  
      cy.location('pathname').should('equal', '/projects');
      cy.getBySel('headerMenu').should('contain', Cypress.env().CY_EMAIL);
    });
  
    it('Switches themes', () => {
      cy.visit(Cypress.env().CY_URL);
  
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
      cy.visit(Cypress.env().CY_URL);
      cy.getBySel('headerMenu').click();
      cy.getBySel('logout').click();
  
      cy.origin(Cypress.env().CY_KEYCLOAK_URL, () => {
        cy.contains('Sign in to your account');
      });
    });
  });
  