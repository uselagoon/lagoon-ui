export default class TaskRepository {
  getCancelBtn() {
    return cy.getBySel('cancel-task').first();
  }

  getErrorNotification() {
    return cy.get('.ant-notification-notice');
  }
}
