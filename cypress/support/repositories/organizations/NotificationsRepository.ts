export default class NotificationsRepository {
  getNotificationRowParents(notification: string) {
    return cy.getBySel('notification-row').contains(notification).parent().parent();
  }
  getAddNotification() {
    return cy.getBySel('addNotification');
  }
  getEditBtn(notification: string) {
    return this.getNotificationRowParents(notification).find('.link');
  }
  getNotificationDelete(notification: string) {
    return this.getNotificationRowParents(notification).find('.btn-red');
  }
}
