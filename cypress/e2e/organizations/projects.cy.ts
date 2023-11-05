import { testData } from 'cypress/fixtures/variables';
import ProjectsActions from 'cypress/support/actions/organizations/ProjectsActions';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const project = new ProjectsActions();

describe('Org Projects page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/projects`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasMutation(req, 'addProjectToOrganization');
      aliasMutation(req, 'deleteProject');
    });
    registerIdleHandler('projectsQuery');
  });

  it('Adds a project', () => {
    cy.waitForNetworkIdle('@projectsQuery', 1000);
    project.doAddProject(testData.organizations.project);
  });

  it('Deletes a project', () => {
    project.doDeleteProject();
  });
});
