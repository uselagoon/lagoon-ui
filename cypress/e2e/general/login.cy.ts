describe('Initial login and theme spec', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));

    cy.visit(Cypress.env('url'));
  });

  it('Logins and gets redirected to /projects', () => {
    cy.location('pathname').should('equal', '/projects');
  });

  it('Checks displayed logged in user ', () => {
    cy.getBySel('user-name').should('contain', Cypress.env('user_owner'));
  });

  it('Switches themes', () => {
    cy.getBySel('theme-icon').then($toggler => {
      if (localStorage.getItem('theme') === 'dark') {
        cy.wrap($toggler).click();

        cy.window().its('localStorage.theme').should('eq', 'light');
        // revert to dark
        cy.getBySel('theme-icon').click();
      } else {
        cy.wrap($toggler).click();

        cy.window().its('localStorage.theme').should('eq', 'dark');
      }
    });
  });

  it('Logs out', () => {
    cy.getBySel('user-name').realHover();

    cy.getBySel('sign-out').click();

    cy.origin(Cypress.env('keycloak'), () => {
      cy.contains('Sign in to your account');
    });
  });
});
