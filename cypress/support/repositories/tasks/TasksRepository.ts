export default class TasksRepository {
  getTasks() {
    return cy.getBySel('tasks-table');
  }
  getCancelBtn() {
    return cy.getBySel('cancel-task').first();
  }
  getTaskSelector(taskNumber: number) {
    cy.getBySel('select-task').click();

    return cy.get(`[id^="react-select-"][id$=-option-${taskNumber}]`);
  }

  getRunTaskBtn() {
    return cy.getBySel('task-btn').contains('Run task');
  }

  getTaskConfirmed() {
    return cy.getBySel('task-form').find('div');
  }

  getResultsLimited() {
    return cy.getBySel('resultsLimited');
  }
  getResultsSelector() {
    return cy.getBySel('result_selector');
  }
  getErrorNotification() {
    return cy.get('.ant-notification-notice');
  }
}
