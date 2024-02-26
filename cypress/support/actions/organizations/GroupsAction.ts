import GroupsRepository from 'cypress/support/repositories/organizations/GroupsRepository';

const groupRepo = new GroupsRepository();

export default class GroupAction {
  doAddGroup(newGroup1: string, newGroup2: string) {
    groupRepo.getAddGroupBtn('addNewGroup').click();
    groupRepo.getGroupNameInput().type(newGroup1);
    groupRepo.getAddGroupSubmitBtn().click();

    cy.wait(['@gqladdGroupToOrganizationMutation', '@gqlgetOrganizationQuery']);
    cy.getBySel('table-row').first().should('contain', newGroup1);

    cy.log('Add another');
    cy.reload();

    groupRepo.getAddGroupBtn('addNewGroup').click();
    groupRepo.getGroupNameInput().type(newGroup2);
    groupRepo.getAddGroupSubmitBtn().click();

    cy.wait(['@gqladdGroupToOrganizationMutation', '@gqlgetOrganizationQuery']);

    cy.getBySel('table-row').eq(1).should('contain', newGroup2);
  }

  doFailedAddGroup(newGroup1: string, newGroup2: string) {
    groupRepo.getAddGroupBtn('addNewGroup').click();
    groupRepo.getGroupNameInput().type(newGroup1);
    groupRepo.getAddGroupSubmitBtn().click();

    cy.wait('@gqladdGroupToOrganizationMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addGroup" on "organization": {"organization":1}`;
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }
  doGroupSearch(group1: string, group2: string) {
    cy.log('First group');
    groupRepo.getSearchBar().type(group1);
    cy.getBySel('table-row').eq(0).should('contain', group1);

    cy.log('No search results');
    groupRepo.getSearchBar().clear().type('does not exist');
    cy.contains('No groups found').should('be.visible');

    cy.log('Second group');
    groupRepo.getSearchBar().clear().type(group2);
    cy.getBySel('table-row').eq(0).should('contain', group2);
  }
  doAddMemberToGroup(userEmail: string) {
    groupRepo.getAddUserBtn('adduser').first().click();
    cy.getBySel("orgUser-email-input").type(userEmail);

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-2').click();
    cy.getBySel('addUserToGroup').click();

    cy.wait(['@gqladdUserToGroupMutation', '@gqlgetOrganizationQuery']);
    cy.waitForNetworkIdle('@groupQuery', 500);

    cy.getBySel('memberCount')
      .first()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal('Members: 1');
      });
  }

  doDeleteGroup(groupName: string) {
    groupRepo.getDeleteGroupBtn('deleteGroup').first().click();
    cy.getBySel('confirm').click();

    cy.intercept('POST', Cypress.env('api')).as('deleteGroup');
    cy.wait('@deleteGroup');
    cy.waitForNetworkIdle('@groupQuery', 500);

    cy.getBySel('label-text').each($span => {
      const text = $span.text();
      if (text.includes('0')) {
        cy.contains('No groups found').should('exist');
      } else {
        cy.getBySel('table-row').eq(0).should('not.contain', groupName);
      }
    });
  }
}
