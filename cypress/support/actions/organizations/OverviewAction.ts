import OverviewRepository from 'cypress/support/repositories/organizations/OverviewRepository';

const overviewRepo = new OverviewRepository();

export default class OverviewAction {
  doNavLinkCheck() {
    overviewRepo.getLinkElement('nav-groups').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/groups');

    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);

    overviewRepo.getLinkElement('nav-org-projects').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/projects');

    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);

    overviewRepo.getLinkElement('nav-notifications').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/notifications');

    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);
    overviewRepo.getLinkElement('nav-manage').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/manage');
  }

  doQuotaFieldCheck() {
    overviewRepo.getFieldElement('groups').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('projects').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('notifications').should('exist').should('not.be.empty');

    overviewRepo.getFieldElement('environments').should('exist').should('not.be.empty');
  }

  changeOrgFriendlyname(friendlyName: string) {
    overviewRepo.getNameEditButton('edit-name').click();

    overviewRepo.getEditField().clear().type(friendlyName);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation');

    cy.waitForNetworkIdle('@idle', 500);

    overviewRepo
      .getfriendlyName()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();

        // Assert that the trimmed text is equal to the expected value
        expect(trimmedText).to.equal(friendlyName);
      });
  }
  doFailedChangeOrgFriendlyname(friendlyName: string) {
    overviewRepo.getNameEditButton('edit-name').click();
    overviewRepo.getEditField().clear().type(friendlyName);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "updateOrganization" on "organization"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  changeOrgDescription(description: string) {
    overviewRepo.getDescEditButton('edit-desc').click();
    overviewRepo.getEditField().clear().type(description);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation');

    cy.waitForNetworkIdle('@idle', 500);

    overviewRepo
      .getDescription()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(description);
      });
  }
  doFailedChangeOrgDescription(description: string) {
    overviewRepo.getDescEditButton('edit-desc').click();
    overviewRepo.getEditField().clear().type(description);
    overviewRepo.getSubmitButton().click();

    cy.wait('@gqlupdateOrganizationFriendlyNameMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "updateOrganization" on "organization"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }
  closeModal() {
    overviewRepo.getCancelButton().click();
  }
}
