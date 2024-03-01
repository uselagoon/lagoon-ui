export default class NavigationRepository {
  getLinkElement(selector: string) {
    return cy.getBySel(selector);
  }
}
