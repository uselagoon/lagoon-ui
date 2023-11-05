import { testData } from 'cypress/fixtures/variables';
import SettingAction from 'cypress/support/actions/settings/SettingsAction';

const settings = new SettingAction();

describe('Settings page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
  });

  it('Initial SSH keys', () => {
    cy.visit(`${Cypress.env().CY_URL}/settings`);
    settings.doEmptySshCheck();
  });

  it('Add SSH key', () => {
    cy.visit(`${Cypress.env().CY_URL}/settings`);

    settings.addSshKey(testData.ssh.name, testData.ssh.value);
  });

  it('Delete SSH key', () => {
    cy.visit(`${Cypress.env().CY_URL}/settings`);

    settings.deleteSshKey(testData.ssh.name);
  });
});
