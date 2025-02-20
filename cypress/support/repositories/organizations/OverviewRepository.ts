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
    return this.getElement('friendly-name');
  }
  getDescription() {
    return this.getElement('org-description');
  }
  getEditField() {
    return this.getElement('edit-input');
  }
  getSubmitButton() {
    return this.getElement('modal-confirm');
  }
  getCancelButton() {
    return this.getElement('modal-cancel');
  }

  getDescEditButton(selector: string) {
    return this.getElement(selector);
  }
}
