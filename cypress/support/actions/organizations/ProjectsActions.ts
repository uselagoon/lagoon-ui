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

    projects.getAddConfirm().click({ force: true });

    cy.wait('@gqladdProjectToOrganizationMutation');

    projects.getProjectRows().contains(projectData.projectName).should('exist');
  }
  doFailedaddProject(projectData: ProjectData) {
    projects.getAddBtn().click({ force: true });
    projects.getName().type(projectData.projectName);
    projects.getGit().type(projectData.gitUrl);

    projects.getEnv().type(projectData.prodEnv);

    projects.selectTarget();

    projects.getAddConfirm().click({ force: true });

    cy.wait('@gqladdProjectToOrganizationMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addProject" on "organization": {"organization":1}`;
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }
  doDeleteProject(projectName: string) {
    projects.getDeleteBtn().first().click();

    cy.get('.highlight')
      .invoke('text')
      .then(highlightText => {
        projects.getDeleteConfirmInput().focus().type(highlightText);
      });

    projects.getDeleteConfirm().click();

    cy.wait('@gqldeleteProjectMutation');

    projects.getProjectRows().contains(projectName).should('not.exist');
  }
}
