import TaskAction from 'cypress/support/actions/task/TaskAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const task = new TaskAction();

describe('Task page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
    registerIdleHandler('idle');
  });

  it('Cancels a running task ', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.intercept('POST', Cypress.env('api'), req => {
      aliasMutation(req, 'cancelTask');
    });
    cy.waitForNetworkIdle('@idle', 500);

    task.doNavToRunningTask();

    task.doCancelTask();
  });
});
