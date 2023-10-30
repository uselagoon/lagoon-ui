import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import NotificationsAction from 'cypress/support/actions/organizations/NotificationsAction';
import OverviewAction from 'cypress/support/actions/organizations/OverviewAction';
import ProjectsActions from 'cypress/support/actions/organizations/ProjectsActions';

const overview = new OverviewAction();
const group = new GroupAction();
const project = new ProjectsActions();
const notifications = new NotificationsAction();

describe('Organizations user journey', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/84`);
  });

  it('Change org name and desc', () => {
    overview.changeOrgFriendlyname();
    overview.changeOrgDescription();
  });

  it('Navigate to groups to create', () => {
    cy.wait(3500);

    cy.get('.groups').click();

    cy.location('pathname').should('equal', '/organizations/84/groups');

    group.doAddGroup(true);
    group.doAddMemberToGroup();
  });

  it('Navigate to projects and add to group', () => {
    cy.wait(3500);
    cy.get('.projects').click();
    cy.location('pathname').should('equal', '/organizations/84/projects');

    project.doAddProject();
  });

  it('Navigate to notifications and create a couple', () => {
    cy.wait(3500);
    cy.get('.notifications').click();
    cy.location('pathname').should('equal', '/organizations/84/notifications');

    notifications.doAddNotification('slack');
    notifications.doAddNotification('email');
    notifications.doAddNotification('webhook');
  });

  it('Nav to a project, add group and notifications', () => {
    cy.visit(`${Cypress.env().CY_URL}/organizations/84/projects/drupal-example-test`);

    cy.getBySel('addGroupToProject').click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-0').click();

    cy.getBySel('addGroupToProjectConfirm').click();

    cy.log('add notifications');

    cy.getBySel('addNotificationToProject').click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-0').click();

    cy.getBySel('addNotificationToProjectConfirm').click();
  });
});
