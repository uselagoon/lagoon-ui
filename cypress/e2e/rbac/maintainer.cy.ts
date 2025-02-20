import { testData } from 'cypress/fixtures/variables';
import deploymentAction from 'cypress/support/actions/deployment/DeploymentAction';
import DeploymentsAction from 'cypress/support/actions/deployments/DeploymentsAction';
import EnvOverviewAction from 'cypress/support/actions/envOverview/EnvOverviewAction';
import ProjectAction from 'cypress/support/actions/project/ProjectAction';
import SettingAction from 'cypress/support/actions/settings/SettingsAction';
import TaskAction from 'cypress/support/actions/task/TaskAction';
import TasksAction from 'cypress/support/actions/tasks/TasksAction';
import VariablesAction from 'cypress/support/actions/variables/VariablesAction';
import { aliasMutation } from 'cypress/utils/aliasQuery';
import { registerIdleHandler } from 'cypress/utils/registerIdleHandler';

const project = new ProjectAction();

const settings = new SettingAction();

const variable = new VariablesAction();

const environmentOverview = new EnvOverviewAction();

const deployments = new DeploymentsAction();

const deployment = new deploymentAction();

const tasks = new TasksAction();

const task = new TaskAction();

describe('MAINTAINER permission test suites', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_maintainer'), Cypress.env('user_maintainer'));
    registerIdleHandler('idle');
  });

  context('Settings', () => {
    it('Adds SSH key', () => {
      cy.visit(`${Cypress.env('url')}/settings`);

      settings.addSshKey(testData.ssh.name, testData.ssh.value);
    });

    it('Deletes SSH key', () => {
      cy.visit(`${Cypress.env('url')}/settings`);
      cy.waitForNetworkIdle('@idle', 500);

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

      cy.getBySel('empty').should('exist');
    });
    it('Adds or updates a variable', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'addEnvVariable');
      });

      const { name, value } = testData.variables[0];

      cy.waitForNetworkIdle('@idle', 500);

      variable.doAddVariable(name, value);

      cy.wait('@gqladdEnvVariableMutation');

      cy.log('check if variable was created');
      cy.get('.data-table > .data-row').should('contain', name);
    });

    it('Toggles Hide/Show values', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      variable.doHideShowToggle();

      cy.log('show all values');

      variable.doValueToggle();

      cy.log('disable show/edit buttons');

      variable.doHideShowToggle();
    });

    it('Deletes a variable', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/project-variables`);

      registerIdleHandler('idle');

      const { name } = testData.variables[0];

      variable.doDeleteVariable(name);

      cy.intercept('POST', Cypress.env('api')).as('deleteRequest');

      cy.wait('@deleteRequest');

      cy.contains('No Project variables set').should('exist');
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
    it('Fails to delete PROD - no permission for maintainer', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironmentError('main');
    });

    it('Deletes staging environment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deleteEnvironment');
      });

      environmentOverview.doDeleteEnvironment('staging');
    });
  });

  context('Deployments', () => {
    it('Does a PROD deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doDeployment();
    });

    it('Does a staging deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-staging/deployments`);

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'deployEnvironmentLatest');
      });

      deployments.doDeployment();
    });

    it('Cancels a staging deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });

      cy.waitForNetworkIdle('@idle', 500);

      deployments.doCancelDeployment();
    });

    it('Cancels a PROD deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);

      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });

      cy.waitForNetworkIdle('@idle', 500);

      deployments.doCancelDeployment();
    });
  });

  context('Deployment', () => {
    it('Cancels a deployment', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/deployments`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelDeployment');
      });
      cy.waitForNetworkIdle('@idle', 500);

      deployment.navigateToRunningDeployment();
      deployment.doCancelDeployment();
    });
  });

  context('Tasks', () => {
    it('Cancels a running task', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');

      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelTask');
      });
      cy.waitForNetworkIdle('@idle', 500);

      tasks.doCancelTask();
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

    it('Does a maintainer task', () => {
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

    it('Generates a login link', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);
      registerIdleHandler('idle');
      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'taskDrushUserLogin');
      });

      cy.waitForNetworkIdle('@idle', 500);

      tasks.doLoginLinkTask();
    });
  });
  context('Task Page', () => {
    it('Cancels a running task', () => {
      cy.visit(`${Cypress.env('url')}/projects/lagoon-demo/lagoon-demo-main/tasks`);

      registerIdleHandler('idle');
      cy.intercept('POST', Cypress.env('api'), req => {
        aliasMutation(req, 'cancelTask');
      });

      cy.waitForNetworkIdle('@idle', 500);

      task.doNavToRunningTask();

      task.doCancelTask();
    });
  });
});
