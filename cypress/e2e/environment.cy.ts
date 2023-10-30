import { testData } from 'cypress/fixtures/variables';
import EnvironmentAction from 'cypress/support/actions/environment/EnvironmentAction';
import ProjectAction from 'cypress/support/actions/project/ProjectAction';

const project = new ProjectAction();

const environment = new EnvironmentAction();

describe('Environment page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);

    cy.wait(500);
    cy.log('Full user navigation from /projects page');

    cy.visit(Cypress.env().CY_URL);

    project.doNavigateToFirst();

    environment.doEnvNavigation();
  });

  it('Hide/Show values', () => {
    environment.doHideShowToggle();

    cy.log('show all values');

    environment.doValueToggle();

    cy.log('disable show/edit buttons');

    environment.doHideShowToggle();
  });

  it('Add/update a variable', () => {
    environment.doAddVariable();
    cy.wait(1000);
    cy.log('check if variable was created');
    cy.get('.data-table > .data-row').should('contain', testData.variables.name);
  });

  it('Delete a variable', () => {
    environment.doDeleteVariable();
    cy.get('.data-table > .data-row').should('not.contain', testData.variables.name);
  });
});
