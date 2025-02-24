import { testData } from 'cypress/fixtures/variables';
import NotificationsRepository from 'cypress/support/repositories/organizations/NotificationsRepository';

const notificationRepo = new NotificationsRepository();

const notifMap = {
  slack: ['name', 'webhook', 'channel'],
  rocketChat: ['name', 'webhook', 'channel'],
  email: ['name', 'email'],
  teams: ['name', 'webhook'],
  webhook: ['name', 'webhook'],
};

type NotificationData = {
  name: string;
  webhook?: string;
  channel?: string;
  email?: string;
};

const getMutationName = (notification: keyof typeof notifMap) => {
  const mutations = {
    slack: 'Slack',
    rocketChat: 'RocketChat',
    email: 'Email',
    teams: 'MicrosoftTeams',
    webhook: 'Webhook',
  } as const;

  return mutations[notification];
};
export default class NotificationsAction {
  doAddNotification(notifType: keyof typeof notifMap, notificationData: NotificationData) {
    const fieldsToFill = notifMap[notifType];

    notificationRepo.getAddNotification().click();

    notificationRepo.getNotificationSelect().click();

    notificationRepo.getNotificationSelectOption(notifType).click();

    fieldsToFill.forEach(field => {
      cy.getBySel(`notification-${field}`).type(notificationData[field as keyof NotificationData] || '');
    });

    cy.getBySel('modal-confirm').click();

    cy.wait(`@gqladdNotification${getMutationName(notifType)}Mutation`);

    // notification name
    cy.getBySel('notification-row').should('include.text', notificationData.name);
  }

  doFailedAddNotification(notifType: keyof typeof notifMap, notificationData: NotificationData) {
    const fieldsToFill = notifMap[notifType];

    notificationRepo.getAddNotification().click();

    notificationRepo.getNotificationSelect().click();

    // Select the option based on the mapping

    notificationRepo.getNotificationSelectOption(notifType).click();

    fieldsToFill.forEach(field => {
      cy.getBySel(`notification-${field}`).type(notificationData[field as keyof NotificationData] || '');
    });

    cy.getBySel('modal-confirm').click();

    cy.wait(`@gqladdNotification${getMutationName(notifType)}Mutation`).then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addNotification" on "organization"`;

      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doEditNotification() {
    const {
      slack: { name: slackName },
    } = testData.organizations.notifications;

    notificationRepo.getEditBtn(slackName).click();

    cy.getBySel('notification-name').first().type('-edited');
    cy.getBySel('notification-webhook').first().type('-edited');

    notificationRepo.getModalConfirm().click();

    cy.wait(`@gqlUpdateNotificationSlackMutation`);

    cy.getBySel('notification-row').should('include.text', `${slackName}-edited`);
  }

  doDeleteNotification(notification: string) {
    notificationRepo.getNotificationDelete(notification).click();

    notificationRepo.getModalConfirm().click();

    cy.getBySel('notification-row').should('not.have.text', notification);
  }
  closeModal() {
    cy.getBySel('modal-cancel').click();
  }
}
