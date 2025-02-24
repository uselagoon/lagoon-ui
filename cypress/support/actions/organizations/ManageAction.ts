import ManageRepository from 'cypress/support/repositories/organizations/ManageRepository';

const manageRepo = new ManageRepository();

export default class ManageAction {
  doAddOrgViewer(viewerUser: string) {
    manageRepo.getAddUserBtn().click();
    manageRepo.getUserEmailField().type(viewerUser);

    manageRepo.getUserRoleDropdown().click();
    manageRepo.getUserViewerRoleOption().click();

    manageRepo.getConfirmBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo.getUserRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(viewerUser);
    });
  }

  doEditOrgViewerToAdmin(user: string) {
    manageRepo.getUserByRow(user).find('[data-cy="update-user"]').click();

    // admin
    manageRepo.getUserRoleDropdown().click();
    manageRepo.getUserAdminRoleOption().click();

    manageRepo.getConfirmBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo.getUserByRow(user).find('div').contains('admin').should('exist');
  }

  doEditOrgViewerToOwner(user: string) {
    manageRepo.getUserByRow(user).find('[data-cy="update-user"]').click();

    // owner
    manageRepo.getUserRoleDropdown().click();
    manageRepo.getUserOwnerRoleOption().click();

    manageRepo.getConfirmBtn().click();

    cy.wait('@gqlAddUserToOrganizationMutation');

    manageRepo.getUserByRow(user).find('div').contains('owner').should('exist');
  }

  doDeleteUser(user: string) {
    manageRepo.getUserToDelete(user).click();

    manageRepo.getConfirmBtn().click();
  }
}
