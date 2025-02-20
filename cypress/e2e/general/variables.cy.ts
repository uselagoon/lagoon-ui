import { testData } from 'cypress/fixtures/variables';
import ProjectAction from 'cypress/support/actions/project/ProjectAction';
import VariablesAction from 'cypress/support/actions/variables/VariablesAction';

const project = new ProjectAction();

const environment = new VariablesAction();

describe('Project variables page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));

    cy.log('Full user navigation from /projects page');

    cy.visit(Cypress.env('url'));

    project.doNavigateToFirst();

    environment.doEnvNavigation();
  });

  it('Checks for no variables set', () => {
    cy.getBySel('empty').should('exist');
  });

  it('Adds or updates a variable', () => {
    const { name, value } = testData.variables[0];

    environment.doAddVariable(name, value);

    cy.intercept('POST', Cypress.env('api')).as('addRequest');

    cy.wait('@addRequest');

    cy.log('check if variable was created');

    cy.getBySel('variable-row').should('contain', name);
  });

  it('Toggles Hide/Show values', () => {
    environment.doHideShowToggle();

    cy.log('show all values');

    environment.doValueToggle();

    cy.log('disable show/edit buttons');

    environment.doHideShowToggle();
  });

  it('Deletes a variable', () => {
    const { name } = testData.variables[0];

    environment.doDeleteVariable(name);

    cy.intercept('POST', Cypress.env('api')).as('deleteRequest');

    cy.wait('@deleteRequest');

    cy.getBySel('empty').should('exist');
  });
});
