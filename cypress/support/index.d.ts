/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Fazer login no BarrigaReact
       * @example
       * cy.BarrigaLogin()
       * 
       */
      BarrigaLogin(): Chainable<any>
  
    }
  }