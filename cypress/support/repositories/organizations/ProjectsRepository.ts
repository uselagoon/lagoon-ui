export default class ProjectsRepository {
  getAddBtn() {
    return cy.getBySel('addNewProject');
  }

  getAddConfirm() {
    return cy.getBySel('addProjectConfirm');
  }

  getName() {
    return cy.get('.inputName');
  }
  getGit() {
    return cy.get('.inputGit');
  }
  getEnv() {
    return cy.get('.inputEnv');
  }
  selectTarget() {
    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-0').click();
  }
  getProjectRows() {
    return cy.get('.tableRow');
  }
  getDeleteBtn() {
    return cy.get("[aria-label='delete']");
  }
  getDeleteConfirm() {
    return cy.getBySel('deleteConfirm');
  }
}
