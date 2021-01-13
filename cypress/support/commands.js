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

Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('https://barrigareact.wcaquino.me/')
    cy.get('[data-test=email]').type(user);
    cy.get('[data-test=passwd]').type(passwd);
    cy.get('.btn').click();

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