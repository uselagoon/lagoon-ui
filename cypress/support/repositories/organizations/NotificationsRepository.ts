export default class NotificationsRepository {
  getAddNotification() {
    return cy.getBySel('addNotification');
  }

  getLast(identifier: string) {
    return cy.get('div.data-table .data-row').find(`.${identifier}`);
  }
}
