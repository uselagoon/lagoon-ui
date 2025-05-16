import ManageRepository from 'cypress/support/repositories/organizations/ManageRepository';

const manageRepo = new ManageRepository();

export default class ManageAction {
  doAddOrgViewer(viewerUser: string) {
    manageRepo.getAddUserBtn().click();
    manageRepo.getUserEmailField().type(viewerUser);
    manageRepo.getSubmitBtn().click();

    cy.wait('@gqlAddAdminToOrganizationMutation');

    manageRepo.getUserRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(viewerUser);
    });
  }

  doEditOrgViewerToAdmin(user: string) {
    manageRepo.getUserRows().contains(user).parents('.tableRow').find('.link').click();

    // admin
    manageRepo.getUserRoleDropdown().click({ force: true });
    manageRepo.getUserAdminRoleOption().click();

    manageRepo.getUpdateBtn().click();

    cy.wait('@gqlAddAdminToOrganizationMutation');

    manageRepo.getUserRows().contains(user).parents('.tableRow').find(':contains("ORG ADMIN")').should('exist');
  }

  doEditOrgViewerToOwner(user: string) {
    manageRepo.getUserRows().contains(user).parents('.tableRow').find('.link').click();

    // owner
    manageRepo.getUserRoleDropdown().click({ force: true });
    manageRepo.getUserOwnerRoleOption().click();

    manageRepo.getUpdateBtn().click();

    cy.wait('@gqlAddAdminToOrganizationMutation');

    manageRepo.getUserRows().contains(user).parents('.tableRow').find(':contains("ORG OWNER")').should('exist');
  }

  doDeleteUser(user: string) {
    manageRepo.getUserRows().contains(user).parents('.tableRow').find("[aria-label='delete']").click();

    manageRepo.getDeleteConfirmBtn().click();
  }
}
