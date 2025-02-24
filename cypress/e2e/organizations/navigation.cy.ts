describe('Org sidebar navigation', () => {
  beforeEach(() => {
    cy.login(Cypress.env('user_platformowner'), Cypress.env('user_platformowner'));
  });

  it('Traverses sidebar nav from Groups -> Users -> Projects -> Notifications -> Manage', () => {
    cy.visit(`${Cypress.env('url')}/organizations/lagoon-demo-organization`);

    context('From /org/id to /groups', () => {
      cy.getBySel('nav-groups').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/groups');
    });

    context('From /groups to /users', () => {
      cy.getBySel('nav-users').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/users');
    });

    context('From /users to /projects', () => {
      cy.getBySel('nav-org-projects').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/projects');
    });

    context('From /projects to /notifications', () => {
      cy.getBySel('nav-notifications').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/notifications');
    });

    context('From /notifications to /manage', () => {
      cy.getBySel('nav-manage').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization/manage');
    });

    context('From /manage to /overview', () => {
      cy.getBySel('nav-org-overview').click();

      cy.location('pathname').should('equal', '/organizations/lagoon-demo-organization');
    });
  });
});
