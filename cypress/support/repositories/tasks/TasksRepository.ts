export default class TasksRepository {

  static numberToTask: { [key: string]: string } = {
    '0': 'Clear Drupal caches',
    '1': 'Run Drupal cron',
    '2': 'Copy database between environments',
    '3': 'Copy files between backup',
    '4': 'Copy files between environments',
    '5': 'Generate database backup',
    '6': 'Generate database and files backup',
    '7': 'Generate login link',
    '8': 'A task that only maintainers can run',
    '9': 'A task that developers can run',

  };

  getTasks() {
    return cy.getBySel('task-row');
  }
  
  getCancelBtn() {
    return this.getTasks().first().getBySel('cancel-task');
  }

  getTaskSelector(taskNumber: number) {

    const selectedTask = TasksRepository.numberToTask[String(taskNumber)];

    cy.getBySel('task-select').children().click();

    return cy.get('.ant-select-tree-title').contains(selectedTask);
  }

  getRunTaskBtn() {
    return cy.getBySel('task-btn');
  }

  getTaskConfirmed() {
    return cy.getBySel('task-row').first().should('contain', 'a few seconds ago');
  }

  getResultsLimited() {
    return cy.getBySel('resultsLimited');
  }
  getResultsSelector() {
    return cy.getBySel('result_selector');
  }

  getNotification() {
    return cy.get('.ant-notification-notice');
  }

  getResultSelector() {
    return cy.getBySel('select-results');
  }
  getResultMenu() {
    return cy.getBySel('select-menu');
  }
}
