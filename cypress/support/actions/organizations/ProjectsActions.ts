import ProjectsRepository from 'cypress/support/repositories/organizations/ProjectsRepository';

const projects = new ProjectsRepository();

type ProjectData = {
  projectName: string;
  gitUrl: string;
  prodEnv: string;
};
export default class ProjectsActions {
  doAddProject(projectData: ProjectData) {
    projects.getAddBtn().click({ force: true });
    projects.getName().type(projectData.projectName);
    projects.getGit().type(projectData.gitUrl);

    projects.getEnv().type(projectData.prodEnv);

    projects.selectTarget();

    projects.getAddConfirm().click();

    cy.wait('@gqladdProjectToOrganizationMutation');

    projects.getProjectRows().contains(projectData.projectName).should('exist');
  }

  doDeleteProject() {
    projects.getDeleteBtn().click();

    projects.getDeleteConfirm().click();

    cy.wait('@gqldeleteProjectMutation');

    projects.getProjectRows().should('not.exist');
  }
}
