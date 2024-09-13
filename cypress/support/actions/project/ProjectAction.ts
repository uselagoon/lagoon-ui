import { default as Project } from '../../repositories/project/ProjectRepository';
import ProjectRepository from '../../repositories/projects/ProjectsRepository';

const projectRepo = new ProjectRepository();

const project = new Project();

export default class ProjectAction {
  doNavigateToFirst() {
    projectRepo.getProject().first().click();
  }

  doClipboardCheck() {
    project.getCopyButton().realClick();

    cy.window().then(win => {
      win.navigator.clipboard.readText().then(() => {
        project.getGitUrl().invoke('text').should('eq', '//git@example.com/lagoon-demo');
      });
    });
  }

  doSidebarPopulatedCheck() {
    project.getGitUrl().should('not.be.empty');
    project.getBranchesField().should('not.be.empty');
    project.getCreatedField().should('not.be.empty');
    project.getDevEnvsField().should('not.be.empty');
    project.getPullRequestsField().should('not.be.empty');
  }

  doExternalLinkCheck() {
    cy.getBySel('gitLink').contains('lagoon-demo');
  }

  doEnvRouteCheck() {
    project.getEnvRoutes().each($element => {
      cy.wrap($element).find('a').should('have.attr', 'href').and('not.be.empty');
    });
  }

  doCreateDummyEnv() {
    project.getEnvBtn().click();

    project.getBranchNameInput().focus().type('123123');

    project.getSubmitBtn().click();

    project.getEnvNames().contains('123123').should('exist');
  }

  doCreateEnvWithPermissionError() {
    project.getEnvBtn().click();
    project.getBranchNameInput().focus().type('123123');
    project.getSubmitBtn().click();

    project
      .getErrorModal()
      .should('exist')
      .should(
        'include.text',
        'GraphQL error: Unauthorized: You don\'t have permission to "deploy:development" on "environment"'
      );
  }
}
