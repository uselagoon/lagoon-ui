export default class SettingsRepository {
  getNameInput() {
    return cy.getBySel('sshKeyName');
  }

  getValueInput() {
    return cy.getBySel('sshKey');
  }

  getSubmitBtn() {
    return cy.getBySel('sshKeyButton');
  }

  getKeyToDelete() {
    return cy.getBySel('data-row');
  }
  getDeleteBtn(name: string) {
    this.getKeyToDelete()
      .contains(name)
      .parent()
      .within(() => {
        cy.getBySel('deleteKey').getBySel('delete').click();
      });
  }
}
