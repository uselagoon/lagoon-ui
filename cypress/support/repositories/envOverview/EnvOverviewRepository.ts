export default class EnvOverviewRepository {
  getEnvType() {
    return cy.getBySel('envType');
  }
  getDeployType() {
    return cy.getBySel('deployType');
  }
  getSource() {
    return cy.getBySel('source');
  }
  getRoutes() {
    return cy.getBySel('routes');
  }
  getDeleteButton() {
    return cy.getBySel('delete');
  }

  getDeleteButtonConfirm() {
    return cy.getBySel('deleteConfirm');
  }
  getDeleteInfo() {
    return cy.getBySel('env-details').get('div').last();
  }
}
