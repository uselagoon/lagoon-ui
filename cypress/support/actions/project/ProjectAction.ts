import { default as Project } from '../../repositories/project/ProjectRepository';

const project = new Project();

export default class ProjectAction {
  doNavigateToFirst() {
    cy.getBySel('project-row').first().closest('[data-cy="project-row"]').find('a').first().click();
  }

  navToDetails() {
    cy.getBySel('nav-details').click();
  }

  doClipboardCheck() {
    project.getCopyButton().click();

    cy.window().then(win => {
      win.navigator.clipboard.readText().then(() => {
        project.getGitUrl().should('contain', 'ssh://git@example.com/lagoon-demo.git');
      });
    });
  }

  doDetailsCheck() {
    project.getGitUrl().should('not.be.empty');
    project.getBranchesField().should('not.be.empty');
    project.getCreatedField().should('not.be.empty');
    project.getDevEnvsField().should('not.be.empty');
    project.getPullRequestsField().should('not.be.empty');
  }

  doExternalLinkCheck() {
    cy.getBySel('git-url').contains('lagoon-demo');
  }

  doEnvRouteCheck() {
    cy.getBySel('environment-row').each($row => {
      cy.wrap($row).find('a').should('have.attr', 'href').and('not.be.empty');
    });
  }

  doCreateDummyEnv() {
    project.getEnvBtn().click();

    project.getBranchNameInput().focus().type('123123');

    // 3 step process
    project.getNextStepButton().click();
    project.getNextStepButton().click();
    project.getNextStepButton().click();

    project.getEnvNames().contains('123123').should('exist');
  }

  doCreateEnvWithPermissionError() {
    project.getEnvBtn().click();

    project.getBranchNameInput().focus().type('123123');

    // 3 step process
    project.getNextStepButton().click();
    project.getNextStepButton().click();
    project.getNextStepButton().click();

    project.getNotification().should('exist').should('include.text', 'There was a problem creating environment.');
  }
}
