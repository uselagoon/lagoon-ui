import ProjectAction from 'cypress/support/actions/project/ProjectAction';

const project = new ProjectAction();

describe('Project page', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_owner'), Cypress.env('user_owner'));
  });

  it('Navigates from /projects to a project', () => {
    cy.visit(Cypress.env('url'));

    project.doNavigateToFirst();
  });

  it('Checks sidebar values/actions', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);

    project.doClipboardCheck();

    project.doSidebarPopulatedCheck();

    project.doExternalLinkCheck();
  });

  it('Checks environment routes', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);
    project.doEnvRouteCheck();
  });

  it('Creates a dummy environment', () => {
    cy.visit(`${Cypress.env('url')}/projects/lagoon-demo`);

    project.doCreateDummyEnv();
  });
});
