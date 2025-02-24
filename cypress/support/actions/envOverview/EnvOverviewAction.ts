import EnvOverviewRepository from 'cypress/support/repositories/envOverview/EnvOverviewRepository';

const environment = new EnvOverviewRepository();

export default class EnvOverviewAction {
  doEnvTypeCheck() {
    environment.getEnvType().should('have.text', 'production');
  }

  doDeployTypeCheck() {
    environment.getDeployType().should('have.text', 'branch');
  }

  doSourceCheck() {
    environment.getSource().should($anchorTag => {
      expect($anchorTag).to.have.attr('target', '_blank');
      expect($anchorTag).to.have.attr('href', 'https://example.com/git/lagoon-demo/tree/main');
    });
  }

  doRoutesCheck() {
    environment.getRoutes().each(($element, index) => {
      cy.wrap($element)
        .find('a')
        .should('have.attr', 'href')
        .and(
          'eq',
          index === 0 ? 'https://lagoondemo.example.org' : 'https://nginx.main.lagoon-demo.ui-kubernetes.lagoon.sh'
        );
    });
  }

  doDeleteEnvironment(branch: string) {
    environment.getDeleteButton().click();

    environment.getConfirmInput().type(branch);

    environment.getDeleteButtonConfirm().click();

    cy.wait('@gqldeleteEnvironmentMutation');

    cy.url().should('include', '/projects/lagoon-demo');
  }

  doDeleteEnvironmentError(branch: string) {
    environment.getDeleteButton().click();
    environment.getConfirmInput().type(branch);
    environment.getDeleteButtonConfirm().click();

    const errorMessage = `Unauthorized: You don\'t have permission to "delete:${
      branch === 'main' ? 'production' : 'development'
    }" on "environment"`;

    cy.wait('@gqldeleteEnvironmentMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });

    environment.getNotification().should('exist').should('include.text', errorMessage);
  }
}
