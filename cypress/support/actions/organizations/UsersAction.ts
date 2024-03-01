import UsersRepository from 'cypress/support/repositories/organizations/UsersRepository';

const userRepo = new UsersRepository();
export default class UsersActions {
  doAddUser(email: string) {
    userRepo.getAddUserBtn().click();
    userRepo.getAddUserEmail().type(email);
    userRepo.getAddUserGroup();
    userRepo.getAddUserRole();

    userRepo.getAddUserConfirm().click();

    cy.wait('@gqladdUserToGroupMutation');

    userRepo.getRows().should($element => {
      const elementText = $element.text();
      expect(elementText).to.include(email);
    });
  }

  doDeleteUser(email: string) {
    userRepo.getRows().contains(email).parents('.tableRow').find("[aria-label='delete']").click();

    userRepo.getConfirmDeleteBtn().click();
  }
}
