export default class BackupsRepository {
  getRetrieveButton() {
    return cy.getBySel('retrieve');
  }
  getBackups() {
    return cy.getBySel('backups');
  }
  getResultsLimited() {
    return cy.getBySel('resultsLimited');
  }
}
