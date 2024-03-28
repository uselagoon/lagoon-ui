export default class GroupsRepository {
  getElement(selector: string) {
    return cy.getBySel(selector);
  }
  getAddGroupBtn(selector: string) {
    return this.getElement(selector);
  }
  getAddUserBtn(selector: string) {
    return this.getElement(selector);
  }
  getDeleteGroupBtn(selector: string) {
    return this.getElement(selector);
  }
  getSystemGroupCheckbox(selector: string) {
    return this.getElement(selector);
  }
  getSorterDropdown(selector: string) {
    return this.getElement(selector);
  }
  getSearchBar() {
    return this.getElement('search-bar');
  }
  getGroupNameInput() {
    return cy.getBySel('groupName-input');
  }
  getAddGroupSubmitBtn() {
    return this.getElement('createGroup');
  }
  getGroupRowSiblings(groupName: string) {
    return this.getElement('table-row').contains(groupName).parent().siblings();
  }
}
