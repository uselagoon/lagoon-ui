import { testData } from 'cypress/fixtures/variables';
import SettingAction from 'cypress/support/actions/settings/SettingsAction';

const settings = new SettingAction();

describe('Settings page', () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_owner"), Cypress.env("user_owner"));
  });

  it('Initial SSH keys', () => {
    cy.visit(`${Cypress.env("url")}/settings`);
    settings.doEmptySshCheck();
  });

  it('Add SSH key', () => {
    cy.visit(`${Cypress.env("url")}/settings`);

    settings.addSshKey(testData.ssh.name, testData.ssh.value);
  });

  it('Delete SSH key', () => {
    cy.visit(`${Cypress.env("url")}/settings`);

    settings.deleteSshKey(testData.ssh.name);
  });
});
