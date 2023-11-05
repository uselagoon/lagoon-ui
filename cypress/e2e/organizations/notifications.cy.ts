import NotificationsAction from 'cypress/support/actions/organizations/NotificationsAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';

const notifications = new NotificationsAction();

describe('Org Notifications page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
    cy.visit(`${Cypress.env().CY_URL}/organizations/99/notifications`);

    cy.intercept('POST', Cypress.env().CY_API, req => {
      aliasMutation(req, 'addNotificationSlack');
      aliasMutation(req, 'UpdateNotificationSlack');
      aliasMutation(req, 'addNotificationRocketChat');
      aliasMutation(req, 'addNotificationMicrosoftTeams');
      aliasMutation(req, 'addNotificationEmail');
      aliasMutation(req, 'addNotificationWebhook');
    });
  });

  it('Add Slack notification', () => {
    notifications.doAddNotification('slack');
  });
  it('Add Rocketchat notification', () => {
    notifications.doAddNotification('rocketChat');
  });
  it('Add Teams notification', () => {
    notifications.doAddNotification('teams');
  });
  it('Add Email notification', () => {
    notifications.doAddNotification('email');
  });
  it('Add Webhook notification', () => {
    notifications.doAddNotification('webhook');
  });

  it('Edit notification', () => {
    notifications.doEditNotification();
  });

  it('Delete notifications', () => {
    notifications.doDeleteNotification('webhook');
    notifications.doDeleteNotification('email');
    notifications.doDeleteNotification('teams');
    notifications.doDeleteNotification('rocketChat');
    notifications.doDeleteNotification('slack');
  });
});
