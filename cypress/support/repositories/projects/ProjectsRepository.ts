export default class ProjectRepository {
  getPageTitle() {
    return cy.getBySel('projectsTitle');
  }
  getSearchBar() {
    return cy.getBySel('searchBar');
  }

  getLengthCounter() {
    return cy.getBySel('projectsLength');
  }

  getProjects() {
    return cy.getBySel('projects');
  }

  getNotMatched() {
    return cy.getBySel('noMatch');
  }
  getNoProjectsLabel() {
    return cy.getBySel('noProjects');
  }
  getProject() {
    return cy.getBySel("project");
  }
}
