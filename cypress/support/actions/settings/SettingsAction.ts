import { testData } from 'cypress/fixtures/variables';
import SettingsRepository from 'cypress/support/repositories/settings/SettingsRepository';

const settings = new SettingsRepository();

export default class SettingAction {
  doEmptySshCheck() {
    // no ssh keys at first
    cy.contains('No SSH keys');
  }

  addSshKey() {
    settings.getNameInput().type(testData.ssh.name);
    settings.getValueInput().type(testData.ssh.value);
    settings.getSubmitBtn().should('not.be.disabled').click();

    cy.contains(testData.ssh.name);
  }

  deleteSshKey(){
    settings.getDeleteBtn().click();

    cy.contains(testData.ssh.name).should("not.exist");
  }
}
