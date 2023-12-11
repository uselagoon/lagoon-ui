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

    const optionIndexMap = {
      slack: 0,
      rocketChat: 1,
      email: 2,
      teams: 3,
      webhook: 4,
    };

    notificationRepo.getAddNotification().click();
    cy.get('.react-select__indicator').click({ force: true });

    // Select the option based on the mapping
    cy.get(`[id^="react-select-"][id$=-option-${optionIndexMap[notifType]}]`).click();

    // const data = testData.organizations.notifications[notifType];

    fieldsToFill.forEach(field => {
      cy.get(`.input${field.charAt(0).toUpperCase() + field.slice(1)}`).type(notificationData[field]);
    });

    cy.getBySel('addNotifBtn').click();

    cy.wait(`@gqladdNotification${getMutationName(notifType)}Mutation`);

    // notification name
    cy.get('div.data-table .data-row').should('include.text', notificationData.name);
  }

  doFailedAddNotification(notifType: keyof typeof notifMap, notificationData: NotificationData){
    const fieldsToFill = notifMap[notifType];

    const optionIndexMap = {
      slack: 0,
      rocketChat: 1,
      email: 2,
      teams: 3,
      webhook: 4,
    };

    notificationRepo.getAddNotification().click();
    cy.get('.react-select__indicator').click({ force: true });

    // Select the option based on the mapping
    cy.get(`[id^="react-select-"][id$=-option-${optionIndexMap[notifType]}]`).click();

    // const data = testData.organizations.notifications[notifType];

    fieldsToFill.forEach(field => {
      cy.get(`.input${field.charAt(0).toUpperCase() + field.slice(1)}`).type(notificationData[field]);
    });

    cy.getBySel('addNotifBtn').click();

    cy.wait(`@gqladdNotification${getMutationName(notifType)}Mutation`).then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = `Unauthorized: You don't have permission to "addNotification" on "organization": {"organization":1}`;

      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doEditNotification() {
    notificationRepo.getLast('link').first().click();

    cy.get('.inputName').first().type('-edited');
    cy.get('.inputWebhook').type('-edited');

    cy.getBySel('continueEdit').click();

    cy.wait(`@gqlUpdateNotificationSlackMutation`);

    cy.get('div.data-table .data-row').should('include.text', '-edited');
  }
  doDeleteNotification(notification: keyof typeof notifMap) {
    notificationRepo.getLast('btn-red').first().click();
    cy.getBySel('confirmDelete').click();

    cy.get('div.data-table .data-row').should('not.have.text', notification);
  }
  closeModal(){
    cy.getBySel("cancel").click();
  }
}
