import SettingsRepository from 'cypress/support/repositories/settings/SettingsRepository';

const settings = new SettingsRepository();

export default class SettingAction {
  doEmptySshCheck() {
    // no ssh keys at first
    cy.contains('No SSH keys');
  }

  addSshKey(name: string, value: string) {
    settings.getNameInput().type(name);
    settings.getValueInput().type(value);
    settings.getSubmitBtn().should('not.be.disabled').click();

    cy.contains(name);
  }

  deleteSshKey(name: string) {
    settings.getDeleteBtn(name);
    cy.log('enter the  name and confirm');
    cy.getBySel('confirm-input').type(name);
    cy.getBySel('deleteConfirm').click();
    cy.contains(name).should('not.exist');
  }
}
