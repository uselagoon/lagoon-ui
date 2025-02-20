export default class EnvOverviewRepository {
  getEnvType() {
    return cy.getBySel('environment-type');
  }
  getDeployType() {
    return cy.getBySel('deployment-type');
  }
  getSource() {
    return cy.get('a[data-cy="source"]');
  }
  getRoutes() {
    return cy.getBySel('routes');
  }

  getDeleteButton() {
    return cy.getBySel('delete');
  }

  getConfirmInput() {
    return cy.getBySel('input-confirm').find('input').focus();
  }

  getDeleteButtonConfirm() {
    return cy.get('.ant-modal-footer').find('button[type="button"]').contains('span', 'Delete');
  }
  getNotification() {
    return cy.get('.ant-notification-notice');
  }
}
