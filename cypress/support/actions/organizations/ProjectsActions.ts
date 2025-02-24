import ProjectsRepository from 'cypress/support/repositories/organizations/ProjectsRepository';

const projects = new ProjectsRepository();

type ProjectData = {
  projectName: string;
  gitUrl: string;
  prodEnv: string;
};
export default class ProjectsActions {
  doAddProject(projectData: ProjectData) {
    projects.getAddBtn().click();

    projects.getNameInput().type(projectData.projectName);
    projects.getGitInput().type(projectData.gitUrl);
    projects.getEnvInput().type(projectData.prodEnv);
    projects.selectTarget();

    projects.getConfirmBtn().click();

    cy.wait('@gqladdProjectToOrganizationMutation');

    projects.getProjectRows().contains(projectData.projectName).should('exist');
  }
  doFailedaddProject(projectData: ProjectData) {
    projects.getAddBtn().click();

    projects.getNameInput().type(projectData.projectName);
    projects.getGitInput().type(projectData.gitUrl);
    projects.getEnvInput().type(projectData.prodEnv);
    projects.selectTarget();

    projects.getConfirmBtn().click();

    cy.wait('@gqladdProjectToOrganizationMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addProject" on "organization"`;
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }
  doDeleteProject(projectName: string) {
    projects.getDeleteBtn(projectName).click();

    projects.getDeleteConfirm().type(projectName);

    projects.getConfirmBtn().click();

    cy.wait('@gqldeleteProjectMutation');

    projects.getProjectRows().contains(projectName).should('not.exist');
  }
}
