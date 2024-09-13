import { testData } from 'cypress/fixtures/variables';
import deploymentAction from 'cypress/support/actions/deployment/DeploymentAction';
import DeploymentsAction from 'cypress/support/actions/deployments/DeploymentsAction';
import EnvOverviewAction from 'cypress/support/actions/envOverview/EnvOverviewAction';
import ProjectAction from 'cypress/support/actions/project/ProjectAction';
import SettingAction from 'cypress/support/actions/settings/SettingsAction';
import TaskAction from 'cypress/support/actions/task/TaskAction';
import TasksAction from 'cypress/support/actions/tasks/TasksAction';
import VariablesAction from 'cypress/support/actions/variables/VariablesAction';
import { aliasMutation, registerIdleHandler } from 'cypress/utils/aliasQuery';

const project = new ProjectAction();

const settings = new SettingAction();

const variable = new VariablesAction();

const environmentOverview = new EnvOverviewAction();

const deployments = new DeploymentsAction();

const deployment = new deploymentAction();

const tasks = new TasksAction();

const task = new TaskAction();

describe('REPORTER permission test suites', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_reporter'), Cypress.env('user_reporter'));
  });

  context('Settings', () => {
    it('Adds SSH key', () => {
      cy.visit(`${Cypress.env('url')}/settings`);

      settings.addSshKey(testData.ssh.name, testData.ssh.value);
    });

    it('Deletes SSH key', () => {
      cy.visit(`${Cypress.env('url')}/settings`);

      settings.deleteSshKey(testData.ssh.name);
    });
  });

  context('Project overview', () => {
    it('Checks environment routes', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);
      project.doEnvRouteCheck();
    });

    it('Gets environment creation permission error', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);

      project.doCreateEnvWithPermissionError();
    });
  });

  context('Variables', () => {
    it('Checks for no variables set', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      cy.contains('No Project variables set').should('exist');
    });

    it('Fails to add a variable - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'addEnvVariable');
      });

      const { name, value } = testData.variables[0];

      cy.waitForNetworkIdle('@idle', 500);

      variable.doAddVariable(name, value);

      cy.wait('@gqladdEnvVariableMutation').then(interception => {
        expect(interception.response?.statusCode).to.eq(200);

        const errorMessage = 'Unauthorized: You don\'t have permission to "project:add" on "env_var"';
        expect(interception.response?.body).to.have.property('errors');

        cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
      });
    });
  });
  context('Environment overview', () => {
    it('Checks environment details', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

      environmentOverview.doEnvTypeCheck();
      environmentOverview.doDeployTypeCheck();

      environmentOverview.doSourceCheck();

      environmentOverview.doRoutesCheck();
    });
    it('Fails to delete environment - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironmentError('main');
    });

    it('Fails to delete any env - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironmentError('staging');
    });
  });

  context('Deployments', () => {
    it('Fails to do a PROD deployment - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doFailedDeployment();
    });

    it('Fails to do a any deployment - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doFailedDeployment();
    });

    it('Fails to do cancel a deployment - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });

      cy.waitForNetworkIdle('@idle', 500);

      deployments.doFailedCancelDeployment();
    });
  });

  context('Deployment', () => {
    it('Fails to cancel deployment - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });
      cy.waitForNetworkIdle('@idle', 500);

      deployment.navigateToRunningDeployment();

      cy.waitForNetworkIdle('@idle', 500);
      deployment.doFailedCancelDeployment();
    });
  });

  context('Backups', () => {
    it('Fails to view backups - no permission to view for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/backups`);
      registerIdleHandler('idle');

      cy.waitForNetworkIdle('@idle', 500);

      const errMessage = 'Error: GraphQL error: Unauthorized: You don\'t have permission to "view" on "backup"';

      cy.get('main').should('exist').find('p').should('exist').and('have.text', errMessage);
    });
  });

  context('Tasks', () => {
    it('Fails to cancel a running task - no permission for REPORTER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelTask');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doFailedTaskCancellation();
    });

    it('Runs cache clear ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doCacheClearTask();
    });

    it('Runs drush cron ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doDrushCronTask();
    });

    it('Fails to run DB backup task - no permission for REPORTER ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'taskDrushSqlDump');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doFailedDbBackupTask();
    });

    it('Fails to run DB/Files backup task - no permission for REPORTER ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'taskDrushArchiveDump');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doFailedDbAndFilesBackupTask();
    });

    it('Fails to generate login link - no permission for REPORTER ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'taskDrushUserLogin');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doFailedLoginLinkTask();
    });
  });
  context('Task Page', () => {
    it('Fails to cancel a running task - no permission for REPORTER ', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

      registerIdleHandler('idle');
      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelTask');
      });

      cy.waitForNetworkIdle('@idle', 500);

      task.doNavToRunningTask();

      task.doFailedCancelTask();
    });
  });
});
