import ProjectRepository from '../../repositories/projects/ProjectsRepository';

const projectRepo = new ProjectRepository();

export default class ProjectAction {
  doPageCheck() {
    projectRepo.getPageTitle().should('have.text', 'Projects');
  }

  doSearch() {
    projectRepo.getSearchBar().type('drupal-example');
    projectRepo.getProjects().its('length').should('equal', 3);
  }

  doEmptySearch() {
    projectRepo.getSearchBar().type('This does not exist');
    projectRepo
      .getNotMatched()
      .invoke('text')
      .should('match', /No projects matching .*/);
  }

  doEmptyProjectCheck() {
    cy.intercept('POST', Cypress.env("api"), req => {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            allProjects: [],
          },
        },
      });
    }).as('allProjects');

    cy.wait('@allProjects');

    projectRepo.getNoProjectsLabel().should('exist');
  }

  doProjectLengthCheck() {
    projectRepo
      .getLengthCounter()
      .invoke('text')
      .then(text => {
        const numberMatch = text.match(/\d+/);
        if (numberMatch) {
          let numberOfProjects = parseInt(numberMatch[0], 10);
          projectRepo.getProjects().its('length').should('equal', numberOfProjects);
        } else {
          throw new Error('Failed to extract the number of projects from the element.');
        }
      });
  }
}
