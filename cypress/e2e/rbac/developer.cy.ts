import { testData } from 'cypress/fixtures/variables';
import BackupsAction from 'cypress/support/actions/backups/BackupsAction';
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

const backups = new BackupsAction();

const tasks = new TasksAction();

const task = new TaskAction();


describe('DEVELOPER permission test suites', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_developer'), Cypress.env('user_developer'));
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

    it('Creates environment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);

      project.doCreateDummyEnv();
    });
  });

  context('Variables', () => {
    it('Checks for no variables set', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      cy.contains('No Project variables set').should('exist');
    });

    it('Fails to add a variable - no permission for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'addEnvVariable');
      });

      const { name, value } = testData.variables[0];

      variable.doAddVariable(name, value);

      cy.wait('@gqladdEnvVariableMutation').then(interception => {
        expect(interception.response?.statusCode).to.eq(200);

        const errorMessage = 'Unauthorized: You don\'t have permission to "project:add" on "env_var": {"project":18}';
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
    it('Fails to delete PROD - no permission for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironmentError('main');
    });

    it('Deletes stating environment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironment('staging');
    });
  });

  context('Deployments', () => {
    it('Fails to do a PROD deployment - no permission for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doFailedDeployment();
    });

    it('Does a staging deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doDeployment();
    });

    it('Fails to cancel any deployment - no permission to CANCEL for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging/deployments`);

      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });

      cy.waitForNetworkIdle('@idle', 500);

      deployments.doFailedCancelDeployment();
    });
  });

  context('Deployment', () => {
    it('Fails to cancel deployment - no permission for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });
      cy.waitForNetworkIdle('@idle', 500);

      deployment.navigateToRunningDeployment();
      deployment.doFailedCancelDeployment();
    });
  });

  context('Backups', () => {
    it('Retrieves a backup', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/backups`);
      registerIdleHandler('idle');

      cy.waitForNetworkIdle('@idle', 500);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'addRestore');
      });

      backups.doRetrieveBackup();
    });
  });

  context('Tasks', () => {
    it('Fails to cancel a running task - no permission for DEVELOPER', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelTask');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doFailedTaskCancellation();
    });

    it('Runs cache clear', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doCacheClearTask();
    });

    it('Runs drush cron', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doDrushCronTask();
    });

    it('Generates DB backup', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.waitForNetworkIdle('@idle', 500);

      tasks.doDbBackupTask();
    });

    it('Does a developer task', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.waitForNetworkIdle('@idle', 500);

      tasks.doDeveloperTask();
    });

    it('Generates DB/Files backup', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.waitForNetworkIdle('@idle', 500);

      tasks.doDbAndFilesBackupTask();
    });

    it('Fails to generate login link - no permission for DEVELOPER', () => {
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
    it('Fails to cancel a running task - no permission for DEVELOPER ', () => {
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
