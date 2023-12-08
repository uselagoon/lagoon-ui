export default class TasksRepository {
  getTasks() {
    return cy.get('.data-table');
  }
  getCancelBtn() {
    return cy.getBySel('cancel-task').first();
  }
  getTaskSelector(taskNumber: number) {
    cy.get('.selectTask').click();

    return cy.get(`[id^="react-select-"][id$=-option-${taskNumber}]`);
  }

  getRunTaskBtn() {
    return cy.get('button').contains('Run task');
  }

  getTaskConfirmed() {
    return cy.get('.taskForm').find('div');
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
