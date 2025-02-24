import TaskAction from 'cypress/support/actions/task/TaskAction';
import TasksAction from 'cypress/support/actions/tasks/TasksAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

const task = new TaskAction();
const tasks = new TasksAction();

describe('Task page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Runs a task', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doCacheClearTask();
  });

  it('Cancels a running task ', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'cancelTask');
    });

    task.doNavToRunningTask();

    task.doCancelTask();
  });
});
