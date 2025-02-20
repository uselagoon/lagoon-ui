import TaskRepository from 'cypress/support/repositories/task/TaskRepository';

const task = new TaskRepository();

export default class TaskAction {
  doNavToRunningTask() {
    cy.getBySel('task-row')
      .find('span.ant-tag')
      .contains('New')
      .first()
      .closest('[data-cy="task-row"]')
      .find('a')
      .first()
      .click();
  }

  doCancelTask() {
    task.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');

    task.getCancelBtn().first();
  }

  doFailedCancelTask() {
    task.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');

    task.getErrorNotification().should('exist').should('include.text', 'There was a problem cancelling a task.');
  }
}
