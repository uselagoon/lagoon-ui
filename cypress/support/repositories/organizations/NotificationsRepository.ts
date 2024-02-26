export default class NotificationsRepository {
  getAddNotification() {
    return cy.getBySel('addNotification');
  }

  getLast(identifier: string) {
    return cy.getBySel('notification-row').find(`.${identifier}`);
  }
}
