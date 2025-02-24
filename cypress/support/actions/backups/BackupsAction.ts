import BackupsRepository from 'cypress/support/repositories/backups/BackupsRepository';

const backups = new BackupsRepository();

export default class BackupsAction {
  doRetrieveBackup() {
    backups.getRetrieveButton().first().click();

    cy.wait('@gqladdRestoreMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
    });
  }

  doCheckAllRetrieveButtons() {
    backups
      .getBackups()
      .should('have.length', 4)
      .each(($row, idx) => {
        if (idx < 3) {
          cy.wrap($row).then($el => {
            const retrieveButton = $el.find('[data-cy="retrieve"]');
            const retrievingButton = $el.find('[data-cy="retrieving"]');

            // one or the other type of buttons exist
            expect(retrieveButton.length + retrievingButton.length).to.be.greaterThan(0);
          });
        }
      });
  }

  doChangeNumberOfResults(val: string | number) {
    backups.getResultSelector().click();

    backups.getResultMenu().find('div').get('.ant-select-item-option-content').contains(val).click({ force: true });

    const expectedLimit = val !== 'All' ? `?results=${val}` : '?results=-1';

    cy.location().should(loc => {
      expect(loc.search).to.eq(expectedLimit);
    });
  }
}
