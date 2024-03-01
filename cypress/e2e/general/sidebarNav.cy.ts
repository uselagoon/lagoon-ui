import { registerIdleHandler } from 'cypress/utils/aliasQuery';

describe('Environment sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Overview/Deployments/Backups/Tasks/Vars/Problems/Facts/Insights', () => {
    const suffix = '/projects/lagoon-demo/lagoon-demo-main';
    cy.visit(`${Cypress.env('url')}${suffix}`);

    context('From /Overview to /Deployments', () => {
      cy.waitForNetworkIdle('@idle', 500);

      cy.getBySel('deployments-tab').click();

      cy.location('pathname').should('equal', `${suffix}/deployments`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /deployments to /backups', () => {
      cy.getBySel('backups-tab').click();

      cy.location('pathname').should('equal', `${suffix}/backups`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /backups to /tasks', () => {
      cy.getBySel('tasks-tab').click();

      cy.location('pathname').should('equal', `${suffix}/tasks`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /tasks to /variables', () => {
      cy.getBySel('envvars-tab').click();

      cy.location('pathname').should('equal', `${suffix}/environment-variables`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /variables to /problems', () => {
      cy.getBySel('problems-tab').click();

      cy.location('pathname').should('equal', `${suffix}/problems`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /problems to /facts', () => {
      cy.getBySel('facts-tab').click();

      cy.location('pathname').should('equal', `${suffix}/facts`);
    });

    cy.waitForNetworkIdle('@idle', 500);

    context('From /facts to /overview', () => {
      cy.getBySel('overview-tab').first().click();

      cy.location('pathname').should('equal', `${suffix}`);
    });
  });
});
