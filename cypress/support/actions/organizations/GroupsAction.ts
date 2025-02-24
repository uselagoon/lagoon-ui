import GroupsRepository from 'cypress/support/repositories/organizations/GroupsRepository';

const groupRepo = new GroupsRepository();

export default class GroupAction {
  doAddGroup(newGroup1: string, newGroup2: string) {
    groupRepo.getAddGroupBtn().click();

    groupRepo.getGroupNameInput().type(newGroup1);
    groupRepo.getModalConfirmBtn().click();

    cy.wait(['@gqladdGroupToOrganizationMutation', '@gqlgetOrganizationQuery']);

    groupRepo.getGroupRows().should('contain', newGroup1);

    cy.log('Add another');
    cy.reload();

    groupRepo.getAddGroupBtn().click();
    groupRepo.getGroupNameInput().type(newGroup2);
    groupRepo.getModalConfirmBtn().click();

    cy.wait(['@gqladdGroupToOrganizationMutation', '@gqlgetOrganizationQuery']);

    groupRepo.getGroupRows().should('contain', newGroup2);
  }

  doFailedAddGroup(newGroup1: string) {
    groupRepo.getAddGroupBtn().click();
    groupRepo.getGroupNameInput().type(newGroup1);
    groupRepo.getModalConfirmBtn().click();

    cy.wait('@gqladdGroupToOrganizationMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addGroup" on "organization"`;
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }
  doGroupSearch(group1: string, group2: string) {
    cy.log('First group');
    groupRepo.getSearchBar().type(group1);
    groupRepo.getGroupRows().should('contain', group1);

    cy.log('No search results');
    groupRepo.getSearchBar().clear().type('does not exist');
    groupRepo.getEmpty().should('be.visible');

    cy.log('Second group');
    groupRepo.getSearchBar().clear().type(group2);
    groupRepo.getGroupRows().should('contain', group2);
  }
  doAddMemberToGroup(userEmail: string, groupToAddTo: string) {
    groupRepo.getAddUserBtn(groupToAddTo).click();

    // name
    groupRepo.getUserNameInput().type(userEmail);

    // role from a modal
    groupRepo.getResultSelector().click();
    groupRepo
      .getResultMenu()
      .find('div')
      .get('.ant-select-item-option-content')
      .contains('Maintainer')
      .click({ force: true });

    groupRepo.getModalConfirmBtn().click();

    cy.wait(['@gqladdUserToGroupMutation', '@gqlgetOrganizationQuery']);
    cy.waitForNetworkIdle('@groupQuery', 500);

    groupRepo
      .getContainingRow(groupToAddTo)
      .closest('[data-cy="group-row"]')
      .find('[data-cy="member-count"]')
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal('Active Members: 1');
      });
  }

  doDeleteGroup(groupName: string) {
    groupRepo.getDeleteGroupBtn().first().click();
    groupRepo.getModalConfirmBtn().click();

    cy.intercept('POST', Cypress.env('api')).as('deleteGroup');
    cy.wait('@deleteGroup');

    groupRepo.getTotalLabel().each($span => {
      const text = $span.text();
      if (text.includes('0')) {
        groupRepo.getEmpty().should('exist');
      } else {
        groupRepo.getGroupRows().should('not.contain', groupName);
      }
    });
  }
}
