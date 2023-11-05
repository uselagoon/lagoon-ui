import { testData } from 'cypress/fixtures/variables';
import UsersRepository from 'cypress/support/repositories/organizations/UsersRepository';

const userRepo = new UsersRepository();
export default class UsersActions {
  doAddUser() {
    userRepo.getAddUserBtn().click();
    userRepo.getAddUserEmail().type(testData.organizations.users.email);
    userRepo.getAddUserGroup();
    userRepo.getAddUserRole();

    userRepo.getAddUserConfirm().click();

    cy.wait('@gqladdUserToGroupMutation');

    userRepo.getRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(testData.organizations.users.email);
    });
  }

  doDeleteUser() {
    userRepo
      .getRows()
      .contains(testData.organizations.users.email)
      .parents('.tableRow')
      .find("[aria-label='delete']")
      .click();

    userRepo.getConfirmDeleteBtn().click();
  }
}
