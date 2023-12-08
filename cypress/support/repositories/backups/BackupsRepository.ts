export default class BackupsRepository {
  getRetrieveButton() {
    return cy.getBySel('retrieve');
  }

  getResultsLimited() {
    return cy.getBySel('resultsLimited');
  }
}
