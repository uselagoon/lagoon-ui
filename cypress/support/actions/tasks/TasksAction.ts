import TasksRepository from 'cypress/support/repositories/tasks/TasksRepository';

const tasks = new TasksRepository();

export default class TasksAction {
  doCancelTask() {
    tasks.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');
  }

  doCacheClearTask() {
    tasks.getTaskSelector(0).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doDrushCronTask() {
    tasks.getTaskSelector(1).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doDbBackupTask() {
    tasks.getTaskSelector(4).click();

    cy.getBySel('source-env').click();

    cy.getBySel('select-menu')
      .find('div')
      .get('.ant-select-item-option-content')
      .contains('dev')
      .click({ force: true });

    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doFailedDbBackupTask() {
    tasks.getTaskSelector(4).click();

    cy.getBySel('source-env').click();

    cy.getBySel('select-menu')
      .find('div')
      .get('.ant-select-item-option-content')
      .contains('dev')
      .click({ force: true });

    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushRsyncFilesMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "drushRsync:source:development" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doDbAndFilesBackupTask() {
    tasks.getTaskSelector(5).click();

    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doFailedDbAndFilesBackupTask() {
    tasks.getTaskSelector(5).click();
    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushSqlDumpMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "drushSqlDump:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doLoginLinkTask() {
    tasks.getTaskSelector(7).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doFailedLoginLinkTask() {
    tasks.getTaskSelector(7).click();
    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushUserLoginMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "drushUserLogin:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doDeveloperTask(taskNum?: number) {
    // this task is only visible to users with roles "developer" and "maintainer"
    tasks.getTaskSelector(taskNum || 7).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }
  doMaintainerTask(taskNum?: number) {
    // this task is only visible to users with role "maintainer"
    tasks.getTaskSelector(taskNum || 8).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed();
  }

  doFailedTaskCancellation() {
    tasks.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "cancel:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });

    tasks.getNotification().should('exist').should('include.text', 'There was a problem cancelling a task.');
  }

  doChangeNumberOfResults(val: string | number) {
    tasks.getResultSelector().click();

    tasks.getResultMenu().find('div').get('.ant-select-item-option-content').contains(val).click({ force: true });

    const expectedLimit = val !== 'All' ? `?tasks_count=${val}` : '?tasks_count=-1';

    cy.location().should(loc => {
      expect(loc.search).to.eq(expectedLimit);
    });
  }
}
