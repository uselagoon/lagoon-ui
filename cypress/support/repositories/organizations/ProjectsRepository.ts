export default class ProjectsRepository {
  getAddBtn() {
    return cy.getBySel('addNewProject');
  }

  getAddConfirm() {
    return cy.getBySel('addProjectConfirm');
  }

  getName() {
    return cy.getBySel('project-name');
  }
  getGit() {
    return cy.getBySel('input-git');
  }
  getEnv() {
    return cy.getBySel('input-env');
  }
  selectTarget() {
    cy.get('div[class$=-control]').click({ force: true });
    cy.get(`[id^="react-select-"][id$=-option-0]`).click();
  }
  getProjectRows() {
    return cy.getBySel('table-row');
  }
  getDeleteBtn() {
    return cy.get("[aria-label='delete']");
  }
  getDeleteConfirm() {
    return cy.getBySel('deleteConfirm');
  }
}
