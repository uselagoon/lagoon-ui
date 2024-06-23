import { testData } from 'cypress/fixtures/variables';
import NotificationsAction from 'cypress/support/actions/organizations/NotificationsAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const notifications = new NotificationsAction();

describe('Org Notifications page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization/notifications`);

    registerIdleHandler('idle');

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'addNotificationSlack');
      aliasMutation(req, 'UpdateNotificationSlack');
      aliasMutation(req, 'addNotificationRocketChat');
      aliasMutation(req, 'addNotificationMicrosoftTeams');
      aliasMutation(req, 'addNotificationEmail');
      aliasMutation(req, 'addNotificationWebhook');
    });
  });

  it('Adds Slack notification', () => {
    const slackData = testData.organizations.notifications.slack;

    notifications.doAddNotification('slack', slackData);
  });
  it('Adds Rocketchat notification', () => {
    const rocketData = testData.organizations.notifications.rocketChat;
    notifications.doAddNotification('rocketChat', rocketData);
  });
  it('Adds Teams notification', () => {
    const teamsData = testData.organizations.notifications.teams;
    notifications.doAddNotification('teams', teamsData);
  });
  it('Adds Email notification', () => {
    const emailData = testData.organizations.notifications.email;
    notifications.doAddNotification('email', emailData);
  });
  it('Adds Webhook notification', () => {
    const webhookData = testData.organizations.notifications.webhook;
    notifications.doAddNotification('webhook', webhookData);
  });

  it('Edits notification', () => {
    cy.waitForNetworkIdle('@idle', 500);
    notifications.doEditNotification();
  });

  it('Deletes notifications', () => {
    const {
      webhook: { name: webhooknName },
      email: { name: emailName },
      teams: { name: teamsName },
      rocketChat: { name: rocketChatName },
      slack: { name: slackName },
    } = testData.organizations.notifications;

    cy.waitForNetworkIdle('@idle', 500);
    notifications.doDeleteNotification(webhooknName);
    cy.waitForNetworkIdle('@idle', 500);
    notifications.doDeleteNotification(emailName);
    cy.waitForNetworkIdle('@idle', 500);
    notifications.doDeleteNotification(teamsName);
    cy.waitForNetworkIdle('@idle', 500);
    notifications.doDeleteNotification(rocketChatName);
    cy.waitForNetworkIdle('@idle', 500);
    notifications.doDeleteNotification(slackName);
  });
});
