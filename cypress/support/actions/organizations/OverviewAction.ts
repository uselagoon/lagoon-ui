import OverviewRepository from 'cypress/support/repositories/organizations/OverviewRepository';

const overviewRepo = new OverviewRepository();

export default class OverviewAction {
  doNavLinkCheck() {
    overviewRepo.getLinkElement('group-link').click();
    cy.location('pathname').should('equal', '/organizations/99/groups');

    cy.visit(`${Cypress.env().CY_URL}/organizations/99`);

    overviewRepo.getLinkElement('project-link').click();
    cy.location('pathname').should('equal', '/organizations/99/projects');

    cy.visit(`${Cypress.env().CY_URL}/organizations/99`);

    overviewRepo.getLinkElement('notification-link').click();
    cy.location('pathname').should('equal', '/organizations/99/notifications');

    cy.visit(`${Cypress.env().CY_URL}/organizations/99`);
    overviewRepo.getLinkElement('manage-link').click();
    cy.location('pathname').should('equal', '/organizations/99/manage');
  }

  doQuotaFieldCheck() {
    overviewRepo.getFieldElement('group').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('project').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('notification').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('environment').should('exist').should('not.be.empty');
  }

  changeOrgFriendlyname(friendlyName: string) {
    overviewRepo.getNameEditButton('edit-name').click();
    overviewRepo.getEditField().type(friendlyName);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation');

    overviewRepo
      .getfriendlyName()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();

        // Assert that the trimmed text is equal to the expected value
        expect(trimmedText).to.equal(friendlyName);
      });
  }
  changeOrgDescription(description: string) {
    overviewRepo.getDescEditButton('edit-description').click();
    overviewRepo.getEditField().type(description);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation');

    overviewRepo
      .getDescription()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(description);
      });
  }
}
