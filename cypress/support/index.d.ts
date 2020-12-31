/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * 
       * @example
       * cy.BarrigaLogin()
       * 
       */
      BarrigaLogin(): Chainable<any>
      AcessaMenuConta(): Chainable<any>
      InserirConta(): Chainable<any>
    }
  }