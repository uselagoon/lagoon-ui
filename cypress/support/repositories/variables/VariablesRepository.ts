export default class VariablesRepository {
  getVariablesLink() {
    return cy.getBySel('variablesLink');
  }

  getToggleShowButton() {
    return cy.getBySel('hideShowValues');
  }
  getAddButton() {
    return cy.getBySel('addVariable');
  }

  getEnvDataRows() {
    return cy.getBySel('environment-row');
  }
  getVariableToDelete() {
    return cy.getBySel('environment-row');
  }
  getDeleteBtn(name: string) {
    this.getVariableToDelete()
      .contains(name)
      .parent()
      .within(() => {
        cy.getBySel('varDelete').click();
      });
  }
}
