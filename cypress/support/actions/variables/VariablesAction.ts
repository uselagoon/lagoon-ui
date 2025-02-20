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
    environment.getEnvDataRows().getBySel('toggle').click({ multiple: true, force: true });
  }

  doAddVariable(name: string, value: string) {
    environment.getAddButton().first().click();

    cy.getBySel('var-name').focus().type(name);

    cy.getBySel('select-scope')
      .click()
      .find('div')
      .get('.ant-select-item-option-content')
      .contains('Runtime')
      .click({ force: true });

    cy.getBySel('var-value').focus().type(value);

    cy.getBySel('modal-confirm').click();
  }

  doDeleteVariable(name: string) {
    environment.getDeleteBtn(name);

    cy.log('enter the  name and confirm');

    cy.getBySel('delete-confirm').type(name);

    cy.getBySel('modal-confirm').click();
  }
}
