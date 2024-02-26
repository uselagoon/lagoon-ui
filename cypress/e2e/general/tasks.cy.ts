import TasksAction from 'cypress/support/actions/tasks/TasksAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const tasks = new TasksAction();

describe('Tasks page', () => {
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

    tasks.doCancelTask();
  });

  it('Starts cache clear task', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doCacheClearTask();
  });

  it('Starts drush cron', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doDrushCronTask();
  });
  it('Generates db backup', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doDbBackupTask();
  });
  it('Generates db/files backup', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doDbAndFilesBackupTask();
  });

  it('Generates login link', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doLoginLinkTask();
  });
  it('Runs maintainer task', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doMaintainerTask();
  });

  it('Runs developer task', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doDeveloperTask();
  });

  it('Changes shown tasks results', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

    cy.waitForNetworkIdle('@idle', 500);

    tasks.doResultsLimitedchangeCheck(10);
    cy.waitForNetworkIdle('@idle', 500);
    tasks.doResultsLimitedchangeCheck(25);
    cy.waitForNetworkIdle('@idle', 500);
    tasks.doResultsLimitedchangeCheck(50);
    cy.waitForNetworkIdle('@idle', 500);
    tasks.doResultsLimitedchangeCheck(100);
    cy.waitForNetworkIdle('@idle', 500);
    tasks.doResultsLimitedchangeCheck('all');
  });
});
