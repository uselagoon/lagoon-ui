import ManageRepository from 'cypress/support/repositories/organizations/ManageRepository';

const manageRepo = new ManageRepository();

export default class ManageAction {
  doAddOrgViewer(viewerUser: string) {
    manageRepo.getAddUserBtn().click();
    manageRepo.getUserEmailField().type(viewerUser);
    manageRepo.getSubmitBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo.getUserRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(viewerUser);
    });
  }

  doEditOrgViewer(user: string) {
    manageRepo.getUserRows().contains(user).parents('.tableRow').find('.link').click();

    manageRepo.getUserIsOwnerCheckbox().check();

    manageRepo.getUpdateBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo
      .getUserRows()
      .contains(user)
      .parents('.tableRow')
      .find(':contains("ORG OWNER")')
      .should('exist');
  }

  doDeleteUser(user: string) {
    manageRepo
      .getUserRows()
      .contains(user)
      .parents('.tableRow')
      .find("[aria-label='delete']")
      .click();

    manageRepo.getDeleteConfirmBtn().click();
  }
}
