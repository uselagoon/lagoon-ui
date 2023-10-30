import { testData } from 'cypress/fixtures/variables';

export default class EnvironmentRepository {
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
    return cy.get('.data-table > .data-row');
  }
  getVariableToDelete() {
    return cy.get('.data-table > .data-row');
  }
}
