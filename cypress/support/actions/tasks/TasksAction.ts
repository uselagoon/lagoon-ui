import TasksRepository from 'cypress/support/repositories/tasks/TasksRepository';

const tasks = new TasksRepository();

export default class TasksAction {
  doCancelTask() {
    tasks.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');

    tasks.getCancelBtn().first().should('have.text', 'Cancelled');
  }

  doCacheClearTask() {
    tasks.getTaskSelector(0).click();
    tasks.getRunTaskBtn().click();
    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doDrushCronTask() {
    tasks.getTaskSelector(1).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doDbBackupTask() {
    tasks.getTaskSelector(4).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doFailedDbBackupTask() {
    tasks.getTaskSelector(4).click();
    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushSqlDumpMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage =
        'Unauthorized: You don\'t have permission to "drushSqlDump:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doDbAndFilesBackupTask() {
    tasks.getTaskSelector(5).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doFailedDbAndFilesBackupTask() {
    tasks.getTaskSelector(5).click();
    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushArchiveDumpMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage =
        'Unauthorized: You don\'t have permission to "drushArchiveDump:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doLoginLinkTask() {
    tasks.getTaskSelector(6).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doFailedLoginLinkTask() {
    tasks.getTaskSelector(6).click();
    tasks.getRunTaskBtn().click();

    cy.wait('@gqltaskDrushUserLoginMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage =
        'Unauthorized: You don\'t have permission to "drushUserLogin:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });
  }

  doDeveloperTask(taskNum?: number) {
    // this task is only visible to users with roles "developer" and "maintainer"
    tasks.getTaskSelector(taskNum || 7).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }
  doMaintainerTask(taskNum?: number) {
    // this task is only visible to users with role "maintainer"
    tasks.getTaskSelector(taskNum || 8).click();
    tasks.getRunTaskBtn().click();

    tasks.getTaskConfirmed().should('contain', 'Task added');
  }

  doFailedTaskCancellation() {
    tasks.getCancelBtn().click();

    cy.wait('@gqlcancelTaskMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);

      const errorMessage = 'Unauthorized: You don\'t have permission to "cancel:production" on "task"';
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });

    tasks.getErrorNotification().should('exist').should('include.text', 'There was a problem cancelling a task.');
  }

  doResultsLimitedchangeCheck(val: string | number) {
    const vals = {
      10: 0,
      25: 1,
      50: 2,
      100: 3,
      all: 4,
    };
    cy.getBySel('select-results').find('div').eq(6).click({ force: true });

    cy.get(`[id^="react-select-"][id$=-option-${vals[val]}]`).click();

    if (val !== 'all') {
      tasks.getResultsLimited().invoke('text').should('be.eq', `Number of results displayed is limited to ${val}`);
    } else {
      cy.location().should(loc => {
        expect(loc.search).to.eq('?limit=-1');
      });
    }
  }
}
