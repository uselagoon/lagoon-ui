export default class ManageRepository {
  getAddUserBtn() {
    return cy.getBySel('addUserbtn');
  }

  getUserEmailField() {
    return cy.getBySel('manageEmail');
  }
  getUserIsOwnerCheckbox() {
    return cy.getBySel('userIsOwner');
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
