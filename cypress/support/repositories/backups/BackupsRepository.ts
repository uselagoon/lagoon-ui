export default class BackupsRepository {
  
  getRetrieveButton() {
    return cy.getBySel('retrieve');
  }

  getBackups() {
    return cy.getBySel('backup-row');
  }

  getResultSelector() {
    return cy.getBySel('select-results');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }
}
