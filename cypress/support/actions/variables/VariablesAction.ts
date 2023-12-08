import VariablesRepository from 'cypress/support/repositories/variables/VariablesRepository';

const environment = new VariablesRepository();

export default class VariablesAction {
  doEnvNavigation() {
    environment.getVariablesLink().click();
  }

  doHideShowToggle() {
    environment.getToggleShowButton().click();
  }

  doValueToggle() {
    environment.getEnvDataRows().get('.showHide').click({ multiple: true });
  }

  doAddVariable(name: string, value: string) {
    environment.getAddButton().click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-1').click();

    cy.getBySel('varName').focus().type(name);
    cy.getBySel('varValue').focus().type(value);

    cy.get('.add-var-btn').click();
  }

  doDeleteVariable(name: string) {
    environment
      .getVariableToDelete()
      .contains(name)
      .parent()
      .within(() => {
        cy.getBySel('varDelete').click();
      });
    cy.log('enter the  name and confirm');
    cy.get('.form-input > input').type(name);
    cy.get('.btn-danger').click();
  }
}
