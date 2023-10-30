export default class UsersRepository {
  getAddUserBtn() {
    return cy.getBySel('addUser');
  }
  getAddUserEmail() {
    return cy.getBySel('addUserEmail');
  }
  getAddUserGroup() {
    cy.get('.react-select__indicator').first().click({ force: true });
    cy.get('#react-select-2-option-0').click();
  }
  getAddUserRole() {
    cy.get('.react-select__indicator').eq(1).click({ force: true });
    cy.get('#react-select-3-option-0').click();
  }

  getAddUserConfirm() {
    return cy.getBySel('addUserConfirm');
  }
  getRows() {
    return cy.get('.tableRow');
  }

  getConfirmDeleteBtn() {
    return cy.getBySel('confirmDeletion');
  }
}
