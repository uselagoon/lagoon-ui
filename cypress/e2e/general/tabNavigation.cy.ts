describe('Environment navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
  });

  it('Overview/Deployments/Backups/Tasks/Vars/Problems/Facts/Insights', () => {
    const suffix = '/projects/lagoon-demo/lagoon-demo-main';

    cy.visit(`${Cypress.env('url')}${suffix}`);

    context('From /Overview to /Deployments', () => {
      cy.getBySel('nav-env-deployments').click();

      cy.location('pathname').should('equal', `${suffix}/deployments`);
    });

    context('From /deployments to /backups', () => {
      cy.getBySel('nav-backups').click();

      cy.location('pathname').should('equal', `${suffix}/backups`);
    });

    context('From /backups to /tasks', () => {
      cy.getBySel('nav-tasks').click();

      cy.location('pathname').should('equal', `${suffix}/tasks`);
    });

    context('From /tasks to /problems', () => {
      cy.getBySel('nav-problems').click();

      cy.location('pathname').should('equal', `${suffix}/problems`);
    });

    context('From /problems to /insights', () => {
      cy.getBySel('nav-insights').click();

      cy.location('pathname').should('equal', `${suffix}/insights`);
    });

    context('From /insights to /environment-variables', () => {
      cy.getBySel('nav-env-variables').click();

      cy.location('pathname').should('equal', `${suffix}/environment-variables`);
    });

    context('From /variables to /overview', () => {
      cy.getBySel('nav-env-overview').click();

      cy.location('pathname').should('equal', `${suffix}`);
    });
  });
});
