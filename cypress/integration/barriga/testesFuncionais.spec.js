/// <reference types="cypress" />

import loc from '../../support/locators'

describe('Testes funcionais', () => {
    before(function () {
        cy.visit('/')
        cy.fixture('login').then((user) => {
            cy.BarrigaLogin(loc.LOGIN.INPUT_USER, loc.LOGIN.INPUT_PASSWORD, loc.LOGIN.BTN_LOGIN, user.login, user.pwd)
            cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
        });
})

it.only('Should create an account', () => {
    cy.BarrigaReset(loc.MESSAGE).then(() => {
        cy.get(loc.HEADER.BTN_OPTIONS).click()
        cy.get(loc.HEADER.OPT_CONTAS).click()
        cy.get(loc.CONTAS.TITLE).should('have.text', 'Contas')
        cy.get(loc.CONTAS.INPUT_NAME).type('Conta Cypress')
        cy.get(loc.CONTAS.BTN_SAVE).click()

        cy.xpath('//td[contains(., "Conta Cypress")]').should('contain.text', 'Conta Cypress')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

})

it.only('Should update an account', function () {

    cy.get(loc.HEADER.BTN_OPTIONS).click()
    cy.get(loc.HEADER.OPT_CONTAS).click()
    cy.get(loc.CONTAS.TITLE).should('have.text', 'Contas')

    cy.xpath('//td[contains(., "Conta Cypress")]/following-sibling::td/i[@class="far fa-edit"]').click()
    cy.get(loc.CONTAS.INPUT_NAME).clear()
    cy.get(loc.CONTAS.INPUT_NAME).type('Conta Cypress Update')
    cy.get(loc.CONTAS.BTN_SAVE).click()

    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
})

it('Should not create an account with same name', function () {

    cy.get(loc.HEADER.BTN_OPTIONS).click()
    cy.get(loc.HEADER.OPT_CONTAS).click()
    cy.get(loc.CONTAS.TITLE).should('have.text', 'Contas')
    cy.get(loc.CONTAS.INPUT_NAME).type('Conta Cypress Update')
    cy.get(loc.CONTAS.BTN_SAVE).click()

    cy.get(loc.MESSAGE).should('contain', 'Request failed')
})

it('Should create a transaction', function () {

    cy.get(loc.HEADER.ICON_HAND$).click()
    cy.get(loc.MOVEMENT.NAME).type('Conta Teste')
    cy.get(loc.MOVEMENT.AMOUNT).type(1000)
    cy.get(loc.MOVEMENT.ENVOLVIDO).type('Test01')
    cy.get(loc.MOVEMENT.SEL_ACCOUNT).select('Conta Cypress Update')
    cy.get(loc.MOVEMENT.STATUS).click()
    cy.get(loc.MOVEMENT.BTN_SAVE).click()

    cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso')

    cy.xpath("(//span[contains(., 'Conta Test')])[1]").should('contain.text', 'Conta Teste')
})

it('Should get balance', function () {


})

it('Should remove a transaction', function () {

    cy.get(':nth-child(3) > .nav-link > .fas').click()
    cy.xpath("//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/li[1]/div[1]/div[2]/i[1]").click()

    cy.get(loc.MESSAGE).should('contain',)

})
})