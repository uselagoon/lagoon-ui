export default class OverviewRepository {
  getElement(selector: string) {
    return cy.getBySel(selector);
  }
  getLinkElement(selector: string) {
    return this.getElement(selector);
  }

  getFieldElement(selector: string) {
    return this.getElement(selector);
  }

  getNameEditButton(selector: string) {
    return this.getElement(selector);
  }

  getfriendlyName() {
    return this.getElement('friendlyName');
  }
  getDescription() {
    return this.getElement('description');
  }
  getEditField() {
    return this.getElement('input-orgName');
  }
  getSubmitButton() {
    return this.getElement('submit-btn').first();
  }
  getCancelButton() {
    return this.getElement('cancel');
  }

  getDescEditButton(selector: string) {
    return this.getElement(selector);
  }
}
