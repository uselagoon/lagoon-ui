import ProjectRepository from '../../repositories/projects/ProjectsRepository';

const projectRepo = new ProjectRepository();

export default class ProjectAction {
  doPageCheck() {
    projectRepo.getPageTitle().should('contain', 'Projects');
  }

  doSearch() {
    projectRepo.getSearchBar().type('lagoon-demo');
    projectRepo.getProjects().its('length').should('equal', 1);
  }

  doEmptySearch() {
    projectRepo.getSearchBar().type('This does not exist');
    projectRepo
      .getNotMatched()
      .should('exist');
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

  doChangeNumberOfResults(val: number | string){
    projectRepo.getResultSelector().click();

    projectRepo.getResultMenu().find('div').get('.ant-select-item-option-content').contains(val).click({ force: true });

    const expectedLimit = val !== 'All' ? `?results=${val}` : '?results=-1';

    cy.location().should(loc => {
      expect(loc.search).to.eq(expectedLimit);
    });
  }
}
