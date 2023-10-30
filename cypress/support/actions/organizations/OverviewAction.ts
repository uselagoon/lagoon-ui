import { testData } from 'cypress/fixtures/variables';
import OverviewRepository from 'cypress/support/repositories/organizations/OverviewRepository';

const overviewRepo = new OverviewRepository();

export default class OverviewAction {
  doNavLinkCheck() {
    overviewRepo.getLinkElement('group-link').click();
    cy.location('pathname').should('equal', '/organizations/84/groups');

    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);

    overviewRepo.getLinkElement('project-link').click();
    cy.location('pathname').should('equal', '/organizations/84/projects');

    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);

    overviewRepo.getLinkElement('notification-link').click();
    cy.location('pathname').should('equal', '/organizations/84/notifications');

    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);
    overviewRepo.getLinkElement('manage-link').click();
    cy.location('pathname').should('equal', '/organizations/84/manage');
  }

  doQuotaFieldCheck() {
    overviewRepo.getFieldElement('group').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('project').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('notification').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('environment').should('exist').should('not.be.empty');
  }

  changeOrgFriendlyname() {
    overviewRepo.getNameEditButton('edit-name').click();
    overviewRepo.getEditField().type(testData.organizations.overview.friendlyName);
    overviewRepo.getSubmitButton().click();

    cy.wait(1000);

    overviewRepo
      .getfriendlyName()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();

        // Assert that the trimmed text is equal to the expected value
        expect(trimmedText).to.equal(testData.organizations.overview.friendlyName);
      });
  }
  changeOrgDescription() {
    overviewRepo.getDescEditButton('edit-description').click();
    overviewRepo.getEditField().type(testData.organizations.overview.description);
    overviewRepo.getSubmitButton().click();

    cy.wait(1000);

    overviewRepo
      .getDescription()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(testData.organizations.overview.description);
      });
  }
}
