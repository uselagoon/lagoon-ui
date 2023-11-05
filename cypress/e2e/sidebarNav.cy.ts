import { registerIdleHandler } from 'cypress/utils/aliasQuery';

describe('Environment sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    registerIdleHandler('idle');
  });

  it('Overview/Deployments/Backups/Tasks/Vars/Problems/Facts/Insights', () => {
    const suffix = '/projects/drupal-example/drupal-example-develop';
    cy.visit(`${Cypress.env().CY_URL}${suffix}`);

    context('From /Overview to /Deployments', () => {
      cy.waitForNetworkIdle('@idle', 500);

      cy.get('.deployments').click();

      cy.location('pathname').should('equal', `${suffix}/deployments`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /deployments to /backups', () => {
      cy.get('.backups').click();

      cy.location('pathname').should('equal', `${suffix}/backups`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /backups to /tasks', () => {
      cy.get('.tasks').click();

      cy.location('pathname').should('equal', `${suffix}/tasks`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /tasks to /variables', () => {
      cy.get('.environmentVariables').click();

      cy.location('pathname').should('equal', `${suffix}/environment-variables`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /variables to /problems', () => {
      cy.get('.problems').click();

      cy.location('pathname').should('equal', `${suffix}/problems`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /problems to /facts', () => {
      cy.get('.facts').click();

      cy.location('pathname').should('equal', `${suffix}/facts`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /facts to /insights', () => {
      cy.get('.insights').click();

      cy.location('pathname').should('equal', `${suffix}/insights`);
    });

    context('From /facts to /overview', () => {
      cy.get('.overview').first().click();

      cy.location('pathname').should('equal', `${suffix}`);
    });
  });
});
