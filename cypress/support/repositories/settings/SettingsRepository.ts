export default class SettingsRepository {
  getAddNewKeyButton() {
    return cy.getBySel('add-key');
  }

  getNameInput() {
    return cy.getBySel('key-name');
  }

  getValueInput() {
    return cy.getBySel('key-value');
  }

  getSubmitBtn() {
    return cy.getBySel('modal-confirm');
  }

  getKeyToDelete() {
    return cy.getBySel('ssh-row');
  }

  getDeleteConfirmInput() {
    return cy.getBySel('delete-confirm');
  }

  getDeleteBtn(name: string) {
    return this.getKeyToDelete()
      .contains(name)
      .parent()
      .within(() => {
        cy.getBySel('delete-button').click();
      });
  }
}
