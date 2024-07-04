export default class ManageRepository {
  getAddUserBtn() {
    return cy.getBySel('addUserbtn');
  }

  getUserEmailField() {
    return cy.getBySel('manageEmail');
  }
  getUserRoleDropdown() {
    return cy.get('.react-select__indicator');
  }

  getUserAdminRoleOption() {
    return cy.get('#react-select-2-option-1');
  }
  getUserOwnerRoleOption() {
    return cy.get('#react-select-2-option-2');
  }

  getSubmitBtn() {
    return cy.getBySel('addUserConfirm');
  }
  getUpdateBtn() {
    return cy.getBySel('updateUser');
  }
  getUserRows() {
    return cy.getBySel('table-row');
  }
  getDeleteConfirmBtn() {
    return cy.getBySel('deleteConfirm');
  }
}
