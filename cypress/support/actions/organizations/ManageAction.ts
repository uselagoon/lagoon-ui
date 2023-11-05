import { testData } from 'cypress/fixtures/variables';
import ManageRepository from 'cypress/support/repositories/organizations/ManageRepository';

const manageRepo = new ManageRepository();

export default class ManageAction {
  doAddOrgViewer() {
    manageRepo.getAddUserBtn().click();
    manageRepo.getUserEmailField().type(testData.organizations.manage.user);
    manageRepo.getSubmitBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo.getUserRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(testData.organizations.manage.user);
    });
  }

  doEditOrgViewer() {
    manageRepo.getUserRows().contains(testData.organizations.manage.user).parents('.tableRow').find('.link').click();

    manageRepo.getUserIsOwnerCheckbox().check();

    manageRepo.getUpdateBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo
      .getUserRows()
      .contains(testData.organizations.manage.user)
      .parents('.tableRow')
      .find(':contains("ORG OWNER")')
      .should('exist');
  }

  doDeleteUser() {
    manageRepo
      .getUserRows()
      .contains(testData.organizations.manage.user)
      .parents('.tableRow')
      .find("[aria-label='delete']")
      .click();

    manageRepo.getDeleteConfirmBtn().click();
  }
}
