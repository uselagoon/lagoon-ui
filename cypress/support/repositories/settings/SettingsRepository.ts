export default class SettingsRepository {
  getNameInput() {
    return cy.getBySel('sshKeyName');
  }

  getValueInput() {
    return cy.getBySel('sshKey');
  }

  getSubmitBtn() {
    return cy.getBySel('sshKey').parent().next();
  }
  getDeleteBtn() {
    return cy.getBySel('deleteKey').getBySel('delete');
  }
}
