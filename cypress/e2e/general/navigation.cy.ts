import NavigationRepository from 'cypress/support/repositories/navigation/NavigationRepository';
import { registerIdleHandler } from 'cypress/utils/aliasQuery';

const navigation = new NavigationRepository();

describe('Navigation tests', () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_owner"), Cypress.env("user_owner"));
    registerIdleHandler('idle');
  });

  it('Checks navigation to settings, organizations and projects pages', () => {
    cy.visit(Cypress.env("url"));

    context('Navigates from /projects to /settings', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('settings').click();

      cy.location('pathname').should('equal', '/settings');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('Navigates from /settings to /organizations', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('organizations').click();

      cy.location('pathname').should('equal', '/organizations');
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('Navigates from /organizations to /projects', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('projects').click();

      cy.location('pathname').should('equal', '/projects');
    });

    cy.waitForNetworkIdle('@idle', 500);
    context('Navigates from /projects to /account', () => {
      cy.getBySel('headerMenu').click();

      navigation.getLinkElement('account').click();

      const redirect = `${Cypress.env("keycloak")}/auth/realms/lagoon/account/`;
      cy.origin(redirect, { args: { redirect } }, ({ redirect }) => {
        cy.location().should(loc => {
          expect(loc.toString()).to.eq(redirect);
        });
      });
    });
  });
});
