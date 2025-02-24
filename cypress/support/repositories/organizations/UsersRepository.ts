export default class UsersRepository {
  getAddUserBtn() {
    return cy.getBySel('add-user');
  }
  getAddUserEmail() {
    return cy.getBySel('user-email');
  }
  addUserToGroup() {
    cy.getBySel('group-select').click();
    this.getResultMenu()
      .find('div')
      .get('.ant-select-item-option-content')
      .contains('lagoon-demo-organization-group')
      .click();
  }
  addUserRole() {
    cy.getBySel('role-select').click();

    this.getResultMenu().find('div').get('.ant-select-item-option-content').contains('Reporter').click();
  }

  getDeleteBtnByEmail(email: string) {
    return this.getRows().contains(email).closest('[data-cy="user-row"]').find('[data-cy="delete-dialog"]');
  }
  getConfirmBtn() {
    return cy.getBySel('modal-confirm');
  }

  getRows() {
    return cy.getBySel('user-row');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }
}
