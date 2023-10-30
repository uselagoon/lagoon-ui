import { testData } from 'cypress/fixtures/variables';
import EnvironmentRepository from 'cypress/support/repositories/environment/EnvironmentRepository';

const environment = new EnvironmentRepository();

export default class EnvironmentAction {
  doEnvNavigation() {
    environment.getVariablesLink().click();
  }

  doHideShowToggle() {
    environment.getToggleShowButton().click();
  }

  doValueToggle() {
    environment.getEnvDataRows().get('.showHide').click({ multiple: true });
  }

  doAddVariable() {
    environment.getAddButton().click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-1').click();

    cy.getBySel('varName').focus().type(testData.variables.name);
    cy.getBySel('varValue').focus().type(testData.variables.value);

    cy.get('.add-var-btn').click();
  }

  doDeleteVariable() {
    environment
      .getVariableToDelete()
      .contains(testData.variables.name)
      .parent()
      .within(() => {
        cy.getBySel('varDelete').click();
      });
      cy.log("enter the  name and confirm");
      cy.get('.form-input > input').type(testData.variables.name);
      cy.get(".btn-danger").click();
  }
}
