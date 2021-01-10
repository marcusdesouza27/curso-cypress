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

import { LoginPage } from "../pages/login.pages"

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


Cypress.Commands.add('BarrigaLogin_old', (elUser, elPwd, elBtn, user, password) => {
    cy.fixture('login').as('barriga').then(() => {
        cy.get(elUser).type(user)
        cy.get(elPwd).type(password)
        cy.get(elBtn).click()

        // cy.get('.toast-close-button').click()
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

Cypress.Commands.add('AddMov', () => {
    cy.get(loc.MENU.ICON_HAND$).click();
    cy.get(loc.MOVEMENT.NAME).type('Movimento a confirmar');
    cy.get(loc.MOVEMENT.AMOUNT).type(10000);
    cy.get(loc.MOVEMENT.ENVOLVIDO).type('MHCS');
    cy.get(loc.MOVEMENT.SEL_ACCOUNT).select('Conta para extrato');
    cy.get(loc.MOVEMENT.BTN_SAVE).click();
    cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso');
    cy.xpath(loc.MOVEMENT.TEST_MOVIMENT('Movimento a confirmar')).should('contain.text', 'Movimento a confirmar');
})

Cypress.Commands.add('loginRest', (user, pass) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: "false",
            senha: pass
        }
    }).then((res) => {
        cy.log(res.body.token)
        cy.writeFile('cypress/fixtures/loginRes.json', res.body)
    })
})

Cypress.Commands.add('getToken', (user, pass) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: user,
            redirecionar: "false",
            senha: pass
        }
    }).its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('resetRest', (auth) => {
    cy.request({
        method: 'GET',
        url: '/reset',
        headers: { Authorization: `JWT ${auth}` }
    }).its('status').should('be.equal', 200);
})

Cypress.Commands.add('getIdConta', (auth, nomeconta) => {
    cy.request({
        method: 'GET',
        url: '/contas',
        headers: { Authorization: `JWT ${auth}` },
        qs: {
            nome: nomeconta
        }
    }).then(res => {
        return res.body[0].id
    })
})

Cypress.Commands.add('getIdMovement', (auth) => {
    cy.request({
        method: 'GET',
        url: '/extrato/202101?orderBy=data_pagamento',
        headers: { Authorization: `JWT ${auth}` },
    }).then((res) => {
        return res.body[0].id
    })
})

Cypress.Commands.add('getSaldoConta', (auth) => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${auth}` },
        })
})