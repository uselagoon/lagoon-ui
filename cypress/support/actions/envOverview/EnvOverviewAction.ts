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
      expect($anchorTag).to.have.attr('href', 'https:////git@example.com/lagoon-demo/tree/main');
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
    cy.getBySel('confirm-input').type(branch);
    environment.getDeleteButtonConfirm().click();

    cy.wait('@gqldeleteEnvironmentMutation');

    environment.getDeleteInfo().invoke('text').should('eq', 'Delete queued');
  }

  doDeleteEnvironmentError(branch: string) {
    environment.getDeleteButton().click();
    cy.getBySel('confirm-input').type(branch);
    environment.getDeleteButtonConfirm().click();

    const errorMessage = `Unauthorized: You don\'t have permission to "delete:${
      branch === 'main' ? 'production' : 'development'
    }" on "environment": {"project":18}`;

    cy.wait('@gqldeleteEnvironmentMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
      expect(interception.response?.body).to.have.property('errors');

      cy.wrap(interception.response?.body.errors[0]).should('deep.include', { message: errorMessage });
    });

    const UiError = 'GraphQL error: ' + errorMessage;

    environment.getDeleteInfo().invoke('text').should('eq', UiError);
  }
}
