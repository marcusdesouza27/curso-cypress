/// <reference types="cypress" />
import loc from '../../support/locators'

const { LoginPage } = require("../../pages/login.pages");
const { HomePage } = require("../../pages/homepage.page");
const { ContasPage } = require("../../pages/contas.pages")
const login = new LoginPage();
const home = new HomePage();
const contas = new ContasPage();

describe('Testes funcionais', () => {
    before(function () {
        cy.visit('https://barrigareact.wcaquino.me/').then(() => {
            home.logout();
        });
        cy.fixture('login').then((user) => {
            login.insertLogin(user.login,user.pwd);
        });
    })

    beforeEach(() => {
        home.resetAll();
    })

    it.only('Should create an account', () => {
        home.verContas();
        contas.insertConta();
        home.validarAlert('Conta inserida com sucesso')

    })

    it('Should update an account', function () {
        cy.AcessaMenuConta();
        cy.xpath('//td[contains(., "Conta para alterar")]/following-sibling::td/i[@class="far fa-edit"]').click()
        cy.get(loc.CONTAS.INPUT_NAME).clear()
        cy.get(loc.CONTAS.INPUT_NAME).type('Conta Cypress Update')
        cy.get(loc.CONTAS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', function () {
        cy.AcessaMenuConta();
        cy.get(loc.CONTAS.INPUT_NAME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SAVE).click()
        cy.get(loc.MESSAGE).should('contain', 'Request failed')
    })

    it('Should create a transaction', function () {
        cy.get(loc.MENU.ICON_HAND$).click();
        cy.get(loc.MOVEMENT.NAME).type('Conta Teste');
        cy.get(loc.MOVEMENT.AMOUNT).type(1000);
        cy.get(loc.MOVEMENT.ENVOLVIDO).type('Test01');
        cy.get(loc.MOVEMENT.SEL_ACCOUNT).select('Conta para movimentacoes');
        cy.get(loc.MOVEMENT.STATUS).click();
        cy.get(loc.MOVEMENT.BTN_SAVE).click();
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso');
        cy.get(loc.MOVEMENT.MOV_LIST).should('have.length', 7);
        cy.xpath(loc.MOVEMENT.TEST_MOVIMENT('Conta Teste')).should('contain.text', 'Conta Teste');
    })

    it('Should get balance', function () {
        cy.get(loc.MENU.HOME).click();
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00');
        cy.get(loc.MENU.ICON_HISTORY).click();
        cy.xpath(loc.MOVEMENT.ICON_UPDATE('Movimentacao 1, calculo saldo')).click();
        cy.get(loc.MOVEMENT.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVEMENT.STATUS).click();
        cy.get(loc.MOVEMENT.BTN_SAVE).click();
        cy.get(loc.MESSAGE).should('contain', 'sucesso');
        cy.get(loc.MENU.ICON_HAND$).click();
        cy.get(loc.MENU.HOME).click();
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'), { timeout: 2000 }).should('contain', '4.034,00');
    })

    it('Should remove a transaction', function () {
        cy.get(loc.MENU.ICON_HISTORY).click()
        cy.xpath(loc.MOVEMENT.ICON_DELETE('Movimentacao para extrato')).click();
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso')
    })
})