/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// stubbing clipboard for localhost on http.
Cypress.on('window:before:load', win => {
  if (!win.navigator.clipboard) {
    // @ts-ignore
    win.navigator.clipboard = {
      copyText: null,
    };
  }

  // @ts-ignore
  win.navigator.clipboard.writeText = text => (this.copyText = text);
  // @ts-ignore
  win.navigator.clipboard.readText = () => Promise.resolve(this.copyText);
});

Cypress.Commands.add('getBySel', (selector: string) => {
  return cy.get(`[data-cy=${selector}]`);
});

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit(Cypress.env('url'));
    cy.origin(Cypress.env('keycloak'), { args: { username, password } }, ({ username, password }) => {
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#kc-login').click();
    });
  });
});

Cypress.Commands.add('gqlQuery', (operationName, query, variables) => {
  const gqlEndpoint = Cypress.env('graphqlEndpoint');

  if (!gqlEndpoint) {
    throw new Error('GraphQL endpoint is not defined');
  }

  const requestBody = {
    operationName,
    query,
    ...(variables ? { variables } : {}),
  };

  // Send a POST request to the gql endpoint
  return cy.request({
    method: 'POST',
    url: gqlEndpoint,
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

Cypress.Commands.add('gqlMutation', (operationName, mutation, variables) => {
  const gqlEndpoint = Cypress.env('graphqlEndpoint');

  if (!gqlEndpoint) {
    throw new Error('GraphQL endpoint is not defined');
  }

  const requestBody = {
    operationName,
    query: mutation,
    ...(variables ? { variables } : {}),
  };

  // Send a POST request to the gql endpoint
  return cy.request({
    method: 'POST',
    url: gqlEndpoint,
    body: requestBody,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
