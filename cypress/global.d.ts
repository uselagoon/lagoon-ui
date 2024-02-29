declare namespace Cypress {
  interface Chainable {
    getBySel(dataTestAttribute: string, args?: any): Chainable<JQuery<HTMLElement>>;

    login(username: string, password: string): void;

    gqlQuery(operationName: string, query: string, variables?: Record<string, string | number | unknown>): void;

    gqlMutation(operationName: string, query: string, variables?: Record<string, string | number | unknown>): void;

    cleanup(): void;
  }
}
