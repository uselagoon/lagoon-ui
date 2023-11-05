import { testData } from 'cypress/fixtures/variables';
import ProjectsRepository from 'cypress/support/repositories/organizations/ProjectsRepository';

const projects = new ProjectsRepository();

export default class ProjectsActions {
  doAddProject() {
    projects.getAddBtn().click({ force: true });
    projects.getName().type(testData.organizations.projects.projectName);
    projects.getGit().type(testData.organizations.projects.gitUrl);

    projects.getEnv().type(testData.organizations.projects.prodEnv);

    projects.selectTarget();

    projects.getAddConfirm().click();

    cy.wait('@gqladdProjectToOrganizationMutation');

    projects.getProjectRows().contains(testData.organizations.projects.projectName).should('exist');
  }

  doDeleteProject() {
    projects.getDeleteBtn().click();

    projects.getDeleteConfirm().click();

    cy.wait('@gqldeleteProjectMutation');

    projects.getProjectRows().should('not.exist');
  }
}
