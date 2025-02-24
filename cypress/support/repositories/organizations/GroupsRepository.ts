export default class GroupsRepository {
  getElement(selector: string) {
    return cy.getBySel(selector);
  }
  getAddGroupBtn() {
    return this.getElement('add-group');
  }
  getAddUserBtn(groupToAddTo: string) {
    return this.getContainingRow(groupToAddTo).closest('[data-cy="group-row"]').find('[data-cy="add-user"]');
  }

  getDeleteGroupBtn() {
    return this.getElement('delete-dialog');
  }

  getGroupRows() {
    return this.getElement('group-row');
  }

  getEmpty() {
    return this.getElement('empty');
  }

  getSearchBar() {
    return this.getElement('search-bar');
  }

  getUserNameInput() {
    return this.getElement('user-email');
  }
  getGroupNameInput() {
    return this.getElement('group-name');
  }

  getModalConfirmBtn() {
    return this.getElement('modal-confirm');
  }

  getContainingRow(groupName: string) {
    return this.getElement('group-row').contains(groupName);
  }

  getResultSelector() {
    return cy.getBySel('user-role');
  }

  getResultMenu() {
    return cy.getBySel('select-menu');
  }

  getTotalLabel() {
    return cy.getBySel('total');
  }
}
