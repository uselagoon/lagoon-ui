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
    environment.getEnvDataRows().getBySel('showhide-toggle').click({ multiple: true, force: true });
  }

  doAddVariable(name: string, value: string, permission: string = '') {
    environment.getAddButton().first().click();

    if (permission === '') {
      cy.get('.react-select__indicator').click({force: true});
      cy.get('#react-select-2-option-1').click();

      cy.getBySel('varName').focus().type(name);
      cy.getBySel('varValue').focus().type(value);

      cy.getBySel('add-variable').click();
    }
  }

  doDeleteVariable(name: string) {
    environment.getDeleteBtn(name);
    cy.waitForNetworkIdle('@idle', 500);
    environment.getDeleteBtn(name);

    cy.log('enter the  name and confirm');
    cy.getBySel('variable-input').type(name);
    cy.getBySel('delete-button').click();
  }
}
