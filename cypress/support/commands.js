// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// const { curry } = require("cypress/types/lodash")

Cypress.Commands.add('ClickAlert', (locator, message) => {
    cy.get(locator).click()

    cy.on('window:alert', msg => {
        console.log(msg)

        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('ConfirmPopup', (ConfirmAlert, AlertPopup, locator) => {
    cy.on('window:confirm', msg => {
        expect(msg).to.be.equal(ConfirmAlert)
    })
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(AlertPopup)
    })
    cy.get(locator).click()
})

Cypress.Commands.add('BarrigaLogin', (user, password) => {
    cy.fixture('login').as('barriga').then(() => {
        cy.get('.input-group > .form-control').type(user)
        cy.get(':nth-child(2) > .form-control').type(password)
        cy.get('.btn').click()
        
        cy.get('.toast-message').its('show')
        cy.get('.toast-close-button').click()
    })
})

Cypress.Commands.add('BarrigaPopUp', ()=> {
    cy.get('.toast-message').its('show')
    cy.get('.toast-close-button').click()
})