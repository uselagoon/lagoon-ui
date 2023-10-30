import { testData } from 'cypress/fixtures/variables';
import GroupsRepository from 'cypress/support/repositories/organizations/GroupsRepository';

const groupRepo = new GroupsRepository();

export default class GroupAction {
  doAddGroup(returnEarly?: boolean) {
    groupRepo.getAddGroupBtn('addNewGroup').click();
    groupRepo.getGroupNameInput().type(testData.organizations.groups.newGroupName);
    groupRepo.getAddGroupSubmitBtn().click();

    cy.wait(3000);

    cy.get('.tableRow').first().should('contain', testData.organizations.groups.newGroupName);

    if (returnEarly) return;

    cy.log('Add another');

    groupRepo.getAddGroupBtn('addNewGroup').click();
    groupRepo.getGroupNameInput().type(testData.organizations.groups.newGroupName2);
    groupRepo.getAddGroupSubmitBtn().click();

    cy.wait(3000);

    cy.get('.tableRow').eq(1).should('contain', testData.organizations.groups.newGroupName2);
  }

  doGroupSearch() {
    cy.log('First group');
    groupRepo.getSearchBar().type(testData.organizations.groups.newGroupName);
    cy.get('.tableRow').eq(0).should('contain', testData.organizations.groups.newGroupName);

    cy.log('No search results');
    groupRepo.getSearchBar().clear().type('does not exist');
    cy.contains('No groups found').should('be.visible');

    cy.log('Second group');
    groupRepo.getSearchBar().clear().type(testData.organizations.groups.newGroupName);
    cy.get('.tableRow').eq(0).should('contain', testData.organizations.groups.newGroupName);
  }
  doAddMemberToGroup() {
    groupRepo.getAddUserBtn('adduser').first().click();
    cy.get('.inputEmail').type(testData.organizations.users.email);

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-2').click();
    cy.getBySel('addUserToGroup').click();

    cy.wait(3000);
    cy.getBySel('memberCount')
      .first()
      .invoke('text')
      .then(text => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal('Members: 1');
      });
  }

  doDeleteGroup() {
    groupRepo.getDeleteGroupBtn('deleteGroup').first().click();
    cy.getBySel('confirm').click();
    cy.wait(3000);
    cy.get('.tableRow').eq(0).should('not.contain', testData.organizations.groups.newGroupName);
  }
}
