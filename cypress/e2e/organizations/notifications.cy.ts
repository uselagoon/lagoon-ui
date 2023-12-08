import { testData } from 'cypress/fixtures/variables';
import NotificationsAction from 'cypress/support/actions/organizations/NotificationsAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const notifications = new NotificationsAction();

describe('Org Notifications page', () => {
  beforeEach(() => {
    cy.login(Cypress.env("user_platformowner"), Cypress.env("user_platformowner"));
    cy.visit(`${Cypress.env("url")}/organizations/1/notifications`);

    cy.intercept('POST', Cypress.env("api"), req => {
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
    notifications.doEditNotification();
  });

  it('Deletes notifications', () => {
    notifications.doDeleteNotification('webhook');
    notifications.doDeleteNotification('email');
    notifications.doDeleteNotification('teams');
    notifications.doDeleteNotification('rocketChat');
    notifications.doDeleteNotification('slack');
  });
});
