import ProjectAction from '../support/actions/projects/ProjectsAction';

const projects = new ProjectAction();

describe('Projects page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
  });

  it('Visits projects page', () => {
    cy.visit(Cypress.env().CY_URL);

    projects.doPageCheck();
  });

  it('Checks project length and counter value', () => {
    cy.visit(Cypress.env().CY_URL);

    projects.doProjectLengthCheck();
  });

  it('Does an empty search', () => {
    cy.visit(Cypress.env().CY_URL);

    projects.doEmptySearch();
  });

  it('Searches for projects', () => {
    cy.visit(Cypress.env().CY_URL);

    projects.doSearch();
  });

  it('Displays no projects (stubbed)', () => {
    cy.visit(Cypress.env().CY_URL);

    projects.doEmptyProjectCheck();
  });
});
