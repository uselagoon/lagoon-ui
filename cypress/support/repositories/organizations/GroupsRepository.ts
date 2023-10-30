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
    return cy.get(".searchBar");
  }
  getGroupNameInput(){
    return cy.get(".inputEmail")
  }
  getAddGroupSubmitBtn(){
    return this.getElement("createGroup");
  }
}
