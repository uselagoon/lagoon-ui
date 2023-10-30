import ProjectAction from 'cypress/support/actions/project/ProjectAction';

const project = new ProjectAction();

describe('Project page', () => {
  beforeEach(() => {
    cy.login(Cypress.env().CY_EMAIL, Cypress.env().CY_PASSWORD);
  });

  it('Navigates from /projects to a project', () => {
    cy.visit(Cypress.env().CY_URL);

    project.doNavigateToFirst();
  });

  it('Checks sidebar values/actions', () => {
    cy.visit(`${Cypress.env().CY_URL}/projects/drupal-example`);

    project.doClipboardCheck();

    project.doSidebarPopulatedCheck();

    project.doExternalLinkCheck();
  });

  it("Check environment routes", () => {
    cy.visit(`${Cypress.env().CY_URL}/projects/drupal-example`);
    project.doEnvRouteCheck();
  })

  it('Bad environment creation', () => {
    cy.visit(`${Cypress.env().CY_URL}/projects/drupal-example`);

    project.doBadEnvCreation();
  });
});
