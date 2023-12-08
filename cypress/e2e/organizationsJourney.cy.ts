import { testData } from 'cypress/fixtures/variables';
import GroupAction from 'cypress/support/actions/organizations/GroupsAction';
import NotificationsAction from 'cypress/support/actions/organizations/NotificationsAction';
import OverviewAction from 'cypress/support/actions/organizations/OverviewAction';
import ProjectsActions from 'cypress/support/actions/organizations/ProjectsActions';
import { aliasMutation, aliasQuery, registerIdleHandler } from 'cypress/utils/aliasQuery';

const overview = new OverviewAction();
const group = new GroupAction();
const project = new ProjectsActions();
const notifications = new NotificationsAction();

describe('Organizations user journey', () => {
  beforeEach(() => {
    // register interceptors/idle handler
    cy.intercept('POST', Cypress.env("api"), req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'updateOrganizationFriendlyName');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'addGroupToOrganization');
    });

    registerIdleHandler('idle');

    cy.login(Cypress.env("user_platformowner"), Cypress.env("user_platformowner"));
    cy.visit(`${Cypress.env("url")}/organizations/1`);
  });

  it('Change org name and desc', () => {
    overview.changeOrgFriendlyname(testData.organizations.overview.friendlyName);
    overview.changeOrgDescription(testData.organizations.overview.description);
  });

  it('Navigate to groups to create', () => {
    cy.waitForNetworkIdle('@idle', 500);

    cy.get('.groups').click();
    cy.location('pathname').should('equal', '/organizations/1/groups');

    group.doAddGroup(testData.organizations.groups.newGroupName, testData.organizations.groups.newGroupName2);
    registerIdleHandler('groupQuery');
    group.doAddMemberToGroup(testData.organizations.users.email);
  });

  it('Navigate to projects and create a new one', () => {
    registerIdleHandler('projectsQuery');
    cy.intercept('POST', Cypress.env("api"), req => {
      aliasMutation(req, 'addProjectToOrganization');
    });

    cy.waitForNetworkIdle('@idle', 500);

    cy.get('.projects').click();
    cy.location('pathname').should('equal', '/organizations/1/projects');
    cy.waitForNetworkIdle('@projectsQuery', 1000);

    project.doAddProject(testData.organizations.project);
  });

  it('Navigate to notifications and create a couple', () => {
    cy.intercept('POST', Cypress.env("api"), req => {
      aliasMutation(req, 'addNotificationSlack');
      aliasMutation(req, 'UpdateNotificationSlack');
      aliasMutation(req, 'addNotificationRocketChat');
      aliasMutation(req, 'addNotificationMicrosoftTeams');
      aliasMutation(req, 'addNotificationEmail');
      aliasMutation(req, 'addNotificationWebhook');
    });

    registerIdleHandler('notificationsQuery');

    cy.waitForNetworkIdle('@idle', 500);
    cy.get('.notifications').click();
    cy.location('pathname').should('equal', '/organizations/1/notifications');
    cy.waitForNetworkIdle('@notificationsQuery', 1000);

    const { slack: slackData, email: emailData, webhook: webhookData } = testData.organizations.notifications;

    notifications.doAddNotification('slack', slackData);
    notifications.doAddNotification('email', emailData);
    notifications.doAddNotification('webhook', webhookData);
  });

  it('Nav to a project, add group and notifications', () => {
    cy.visit(`${Cypress.env("url")}/organizations/1/projects/${testData.organizations.project.projectName}`);

    cy.getBySel('addGroupToProject').click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-0').click();

    cy.getBySel('addGroupToProjectConfirm').click();

    cy.log('add notifications');

    cy.getBySel('addNotificationToProject').click();

    cy.get('[class$=control]').click({ force: true });
    cy.get('#react-select-3-option-0').click();

    cy.getBySel('addNotificationToProjectConfirm').click();
  });

  // cleanup
  after(() => {
    registerIdleHandler('projectsQuery');
    registerIdleHandler('groupQuery');
    cy.intercept('POST', Cypress.env("api"), req => {
      aliasMutation(req, 'removeNotification');
      aliasMutation(req, 'deleteGroup');
      aliasMutation(req, 'deleteProject');
    });

    cy.waitForNetworkIdle('@idle', 500);
    cy.get('.groups').click();

    group.doDeleteGroup(testData.organizations.groups.newGroupName);
    cy.wait('@gqldeleteGroupMutation');

    group.doDeleteGroup(testData.organizations.groups.newGroupName2);
    cy.wait('@gqldeleteGroupMutation');

    cy.waitForNetworkIdle('@idle', 500);
    cy.get('.projects').click();

    cy.waitForNetworkIdle('@projectsQuery', 1000);

    project.doDeleteProject();

    cy.get('.notifications').click();

    cy.waitForNetworkIdle('@idle', 500);

    notifications.doDeleteNotification('webhook');
    cy.wait('@gqlremoveNotificationMutation'); // wait for a delete mutation instead
    notifications.doDeleteNotification('email');
    cy.wait('@gqlremoveNotificationMutation');
    notifications.doDeleteNotification('slack');
  });
});
