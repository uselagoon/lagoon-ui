import ProjectsActions from 'cypress/support/actions/organizations/ProjectsActions';

const project = new ProjectsActions();

describe('Org Projects page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84/projects`);
  });

  it('Add a project', () => {
    project.doAddProject();
  });

    it('Delete a project', () => {
      project.doDeleteProject();
    });
});
