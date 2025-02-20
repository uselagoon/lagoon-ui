
export const registerIdleHandler = (alias: string) => {
    cy.waitForNetworkIdlePrepare({
      method: 'POST',
      pattern: '*',
      alias,
    });
  };
  