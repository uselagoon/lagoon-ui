import { testData } from 'cypress/fixtures/variables';
import ProjectsActions from 'cypress/support/actions/organizations/ProjectsActions';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const project = new ProjectsActions();

describe('Org Projects page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/projects`);

    cy.intercept('POST', Cypress.env('api'), req => {
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
    project.doDeleteProject(testData.organizations.project.projectName);
  });
});
