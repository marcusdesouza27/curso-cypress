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
import loc from "./locators"

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

Cypress.Commands.add('BarrigaLogin', (elUser, elPwd, elBtn, user, password) => {
    cy.fixture('login').as('barriga').then(() => {
        cy.get(elUser).type(user)
        cy.get(elPwd).type(password)
        cy.get(elBtn).click()

        cy.get('.toast-close-button').click()
    })
})
Cypress.Commands.add('BarrigaReset', (idpopup) => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESET).click()

    cy.get(idpopup).should('contain', 'Dados resetados com sucesso')
    // cy.get('.toast-close-button').click()
})

Cypress.Commands.add('BarrigaPopUp', (idpopup, popmessage) => {
    cy.get(idpopup)
        .should('exist')
        .and('contain', popmessage)
    // cy.get('.toast-close-button').click()
})

Cypress.Commands.add('BarrigaClosePop', () => {
    cy.get('.toast-close-button').click()
})

Cypress.Commands.add('AcessaMenuConta', () => {
    cy.get(loc.MENU.BTN_OPTIONS).click()
    cy.get(loc.MENU.OPT_CONTAS).click()
    cy.get(loc.CONTAS.TITLE).should('have.text', 'Contas')
})

Cypress.Commands.add('InserirConta', (conta) => {
    cy.get(loc.CONTAS.INPUT_NAME).type(conta)
    cy.get(loc.CONTAS.BTN_SAVE).click()
})