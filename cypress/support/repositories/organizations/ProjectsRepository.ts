export default class ProjectsRepository {
  getAddBtn() {
    return cy.getBySel('create-project');
  }

  getConfirmBtn() {
    return cy.getBySel('modal-confirm');
  }

  getNameInput() {
    return cy.getBySel('project-name');
  }

  getGitInput() {
    return cy.getBySel('git-url');
  }

  getEnvInput() {
    return cy.getBySel('prod-environment');
  }

  getProjectRows() {
    return cy.getBySel('org-project-row');
  }

  getDeleteBtn(projectName: string) {
    return this.getProjectRows()
      .contains(projectName)
      .closest('[data-cy="org-project-row"]')
      .find('[data-cy="delete"]');
  }

  getDeleteConfirm() {
    return cy.getBySel('delete-confirm-input');
  }

  getScopeSelector() {
    return cy.getBySel('select-scope');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }
  selectTarget() {
    this.getScopeSelector().click();
    this.getResultMenu().find('div').get('.ant-select-item-option-content').contains('ui-kubernetes').click();
  }
}
