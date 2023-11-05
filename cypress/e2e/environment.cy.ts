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

  it('Toggles Hide/Show values', () => {
    environment.doHideShowToggle();

    cy.log('show all values');

    environment.doValueToggle();

    cy.log('disable show/edit buttons');

    environment.doHideShowToggle();
  });

  it('Adds or updates a variable', () => {
    const { name, value } = testData.variables[0];

    environment.doAddVariable(name, value);

    cy.intercept('POST', Cypress.env().CY_API).as('addRequest');

    cy.wait('@addRequest');

    cy.log('check if variable was created');
    cy.get('.data-table > .data-row').should('contain', name);
  });

  it('Deletes a variable', () => {
    const { name } = testData.variables[0];

    environment.doDeleteVariable(name);

    cy.intercept('POST', Cypress.env().CY_API).as('deleteRequest');

    cy.wait('@deleteRequest');

    cy.get('.data-table > .data-row').should('not.contain', name);
  });
});
