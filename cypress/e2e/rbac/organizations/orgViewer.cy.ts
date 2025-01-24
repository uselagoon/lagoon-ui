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

describe(`Organizations ORGVIEWER journey`, () => {
  beforeEach(() => {
    // register interceptors/idle handler
    cy.intercept('POST', Cypress.env('api'), req => {
      aliasQuery(req, 'getOrganization');
      aliasMutation(req, 'updateOrganizationFriendlyName');
      aliasMutation(req, 'addUserToGroup');
      aliasMutation(req, 'addGroupToOrganization');
      aliasMutation(req, 'addProjectToGroup');
      aliasMutation(req, 'addNotificationToProject');
    });

    registerIdleHandler('idle');

    cy.login(Cypress.env('user_orgviewer'), Cypress.env('user_orgviewer'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);
  });

  it('Fails to change org name and desc - no permission for ORGVIEWER', () => {
    overview.doFailedChangeOrgFriendlyname(testData.organizations.overview.friendlyName);
    overview.closeModal();
    overview.doFailedChangeOrgDescription(testData.organizations.overview.description);
    overview.closeModal();
  });

  it('Navigates to groups and fails to create a one - no permission for ORGVIEWER', () => {
    cy.waitForNetworkIdle('@idle', 500);

    cy.get('.groups').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/groups');

    group.doFailedAddGroup(
      testData.organizations.groups.newGroupName + '-viewer',
      testData.organizations.groups.newGroupName2
    );
  });

  it('Navigates to projects and fails to create a new one - no permission for ORGVIEWER', () => {
    registerIdleHandler('projectsQuery');
    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'addProjectToOrganization');
    });

    cy.waitForNetworkIdle('@idle', 500);

    cy.get('.projects').click();
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/projects');
    cy.waitForNetworkIdle('@projectsQuery', 1000);

    project.doFailedaddProject(testData.organizations.project);
  });

  it('Navigates to notifications and fails to create any - no permission for ORVIEWER', () => {
    cy.intercept('POST', Cypress.env('api'), req => {
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
    cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/notifications');
    cy.waitForNetworkIdle('@notificationsQuery', 1000);

    const { slack: slackData, email: emailData, webhook: webhookData } = testData.organizations.notifications;

    notifications.doFailedAddNotification('slack', slackData);
    notifications.closeModal();

    notifications.doFailedAddNotification('email', emailData);
    notifications.closeModal();
    notifications.doFailedAddNotification('webhook', webhookData);
    notifications.closeModal();
  });

  it('Navigates to a project, fails to add a group or notifications - no permission for ORGVIEWER', () => {
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/projects/lagoon-demo-org`);
    cy.waitForNetworkIdle('@idle', 1000);

    cy.getBySel('addGroupToProject').click();

    cy.get('.react-select__indicator').click({ force: true });
    cy.get('#react-select-2-option-0').click();

    cy.log('Fail to add notifications');
    cy.getBySel('addGroupToProjectConfirm').click();

    cy.wait('@gqladdProjectToGroupMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
      const errorMessage = `Unauthorized: You don't have permission to "addGroup" on "organization"`;
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });

    // close modal
    cy.get('.modal__overlay').click({ force: true });

    cy.getBySel('addNotificationToProject').click();

    cy.get('[class$=control]').click({ force: true });
    cy.get('#react-select-3-option-0').click();

    cy.getBySel('addNotificationToProjectConfirm').click();

    cy.wait('@gqladdNotificationToProjectMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
      const errorMessage = `Unauthorized: You don't have permission to "addNotification" on "organization"`;

      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  });
});
