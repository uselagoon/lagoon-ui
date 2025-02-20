import SettingsRepository from 'cypress/support/repositories/settings/SettingsRepository';

const settings = new SettingsRepository();

export default class SettingAction {
  doEmptySshCheck() {
    // no ssh keys at first
    cy.getBySel('empty').should('exist');
  }

  addSshKey(name: string, value: string) {
    settings.getAddNewKeyButton().click();

    settings.getNameInput().type(name);

    settings.getValueInput().type(value);

    settings.getSubmitBtn().should('not.be.disabled').click();

    cy.contains(name);
  }

  deleteSshKey(name: string) {
    settings.getDeleteBtn(name);

    cy.log('enter the name and confirm');

    settings.getDeleteConfirmInput().focus().type(name);

    settings.getSubmitBtn().click();

    cy.contains(name).should('not.exist');
  }
}
