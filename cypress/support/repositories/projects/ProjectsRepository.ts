export default class ProjectRepository {
  getPageTitle() {
    return cy.getBySel('page-title');
  }

  getSearchBar() {
    return cy.getBySel('search-bar');
  }

  getLengthCounter() {
    return cy.getBySel('projects-total');
  }

  getProjects() {
    return cy.getBySel('project-row');
  }

  getNotMatched() {
    return cy.getBySel('empty');
  }
  getResultSelector() {
    return cy.getBySel('select-results');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }
}
