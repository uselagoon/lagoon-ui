export default class NotificationsRepository {
  getNotificationRowByName(notification: string) {
    return cy.getBySel('notification-row').contains(notification).closest('[data-cy="notification-row"]');
  }
  getAddNotification() {
    return cy.getBySel('add-notification');
  }

  getNotificationSelect() {
    return cy.getBySel('notification-type');
  }
  getSelectMenu() {
    return cy.getBySel('select-menu');
  }
  getNotificationSelectOption(type: string) {
    return this.getSelectMenu().find('div').get('.ant-select-item-option-content').contains(type.toUpperCase());
  }

  getEditBtn(notification: string) {
    return this.getNotificationRowByName(notification).find('[data-cy="edit-notification"]');
  }
  getNotificationDelete(notification: string) {
    return this.getNotificationRowByName(notification).find('[data-cy="delete-dialog"]');
  }

  getModalConfirm(){
    return cy.getBySel("modal-confirm")
  }
}
