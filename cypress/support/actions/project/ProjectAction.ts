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
      win.navigator.clipboard.readText().then(text => {
        project.getGitUrl().invoke('text').should('match', text);
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
    cy.getBySel('gitLink').contains('drupal-example');
  }

  doEnvRouteCheck() {
    project.getEnvRoutes().each($element => {
      cy.wrap($element).find('a').should('have.attr', 'href').and('not.be.empty');
    });
  }

  doBadEnvCreation() {
    project.getEnvBtn().click();

    project.getBranchNameInput().focus().type('does not exist');

    project.getSubmitBtn().click();

    project
      .getErrorNotification()
      .should('exist')
      .should('include.text', 'There was a problem creating an Environment.');
  }
}
