export default class VariablesRepository {
  getVariablesLink() {
    return cy.getBySel('nav-variables');
  }

  getToggleShowButton() {
    return cy.getBySel('var-visibility-toggle');
  }
  getAddButton() {
    return cy.getBySel('add-variable');
  }

  getEnvDataRows() {
    return cy.getBySel('variable-row');
  }

  getVariableToDelete() {
    return cy.getBySel('variable-row');
  }

  getDeleteBtn(name: string) {
    return this.getVariableToDelete()
      .contains(name)
      .closest('[data-cy="variable-row"]')
      .within(() => {
        cy.getBySel('delete-button').click();
      });
  }
}
