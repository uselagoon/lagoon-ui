import NavigationRepository from 'cypress/support/repositories/navigation/NavigationRepository';

const navigation = new NavigationRepository();

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
  });

  it('Settings/Projects/Organizations', () => {
    cy.visit(Cypress.env().CY_URL);

    context('From /projects to /settings', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('settings').click();

      cy.location('pathname').should('equal', '/settings');
    });

    cy.wait(500);

    context('From /settings to /organizations', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('organizations').click();

      cy.location('pathname').should('equal', '/organizations');
    });

    cy.wait(500);

    context('From /organizations to /projects', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('projects').click();

      cy.location('pathname').should('equal', '/projects');
    });

    cy.wait(500);
    context('From /projects to /account', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('account').click();

      const redirect = `${Cypress.env().CY_KEYCLOAK_URL}/auth/realms/lagoon/account/`;
      cy.origin(redirect, { args: { redirect } }, ({ redirect }) => {
        cy.location().should(loc => {
          expect(loc.toString()).to.eq(redirect);
        });
      });
    });
  });
});
