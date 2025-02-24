export default class ManageRepository {
  getAddUserBtn() {
    return cy.getBySel('add-admin');
  }

  getUserEmailField() {
    return cy.getBySel('user-email');
  }

  getUserRoleDropdown() {
    return cy.getBySel('user-role');
  }

  getUserAdminRoleOption() {
    return cy.get('.ant-select-item-option-content').contains('Admin');
  }

  getUserOwnerRoleOption() {
    return cy.get('.ant-select-item-option-content').contains('Owner');
  }

  getUserViewerRoleOption() {
    return cy.get('.ant-select-item-option-content').contains('Viewer');
  }

  getConfirmBtn() {
    return cy.getBySel('modal-confirm');
  }

  getUserRows() {
    return cy.getBySel('admin-row');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }

  getUserByRow(user: string) {
    return this.getUserRows().contains(user).closest('[data-cy="admin-row"]');
  }

  getUserToDelete(user: string) {
    return this.getUserByRow(user).find('[data-cy="delete-dialog"]');
  }
}
