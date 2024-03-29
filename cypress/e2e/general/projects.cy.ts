import ProjectAction from '../../support/actions/projects/ProjectsAction';

const projects = new ProjectAction();

describe('Projects page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
  });

  it('Visits projects page', () => {
    cy.visit(Cypress.env('url'));

    projects.doPageCheck();
  });

  it('Checks project length and counter value', () => {
    cy.visit(Cypress.env('url'));

    projects.doProjectLengthCheck();
  });

  it('Does an empty search', () => {
    cy.visit(Cypress.env('url'));

    projects.doEmptySearch();
  });

  it('Searches for projects', () => {
    cy.visit(Cypress.env('url'));

    projects.doSearch();
  });

  it('Displays no projects (stubbed)', () => {
    cy.visit(Cypress.env('url'));

    projects.doEmptyProjectCheck();
  });
});
