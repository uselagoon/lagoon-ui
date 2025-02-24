import UsersRepository from 'cypress/support/repositories/organizations/UsersRepository';

const userRepo = new UsersRepository();
export default class UsersActions {
  doAddUser(email: string) {
    userRepo.getAddUserBtn().click();
    userRepo.getAddUserEmail().type(email);

    userRepo.addUserToGroup();
    userRepo.addUserRole();

    userRepo.getConfirmBtn().click();

    cy.wait('@gqladdUserToGroupMutation');

    userRepo.getRows().contains(email).should('exist');

  }

  doDeleteUser(email: string) {

    userRepo.getDeleteBtnByEmail(email).click();

    userRepo.getConfirmBtn().click();
  }
}
