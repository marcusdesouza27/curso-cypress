/// <reference types="cypress" />

const { LoginPage } = require("../../pages/login.pages");
const { HomePage } = require("../../pages/homepage.page");
const { ContasPage } = require("../../pages/contas.pages");
const { MovimentacaoPage } = require("../../pages/movimentacao.page");
const { ExtratoPage } = require("../../pages/extrato.page");
const { SaldoPage } = require("../../pages/saldo.page");
const login = new LoginPage();
const home = new HomePage();
const contas = new ContasPage();
const movimentacao = new MovimentacaoPage();
const extrato = new ExtratoPage();
const saldo = new SaldoPage();

describe('Testes funcionais', () => {
    before(function () {
        
    })

    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me/').then(() => {
            cy.fixture('login').then((user) => {
                login.insertLogin(user.login, user.pwd);
                home.validarAlert(`Bem vindo, ${user.name}`);
            });
        });
        home.resetAll();
        home.validarAlert("Dados resetados com sucesso");
    })

    afterEach(() => {
        home.logout();
        home.validarAlert('Até Logo!');
    })

    it('Should create an account', () => {
        home.loadContas();
        contas.insertConta('Conta Cypress Test');
        home.validarAlert('Conta inserida com sucesso');
    })

    it('Should update an account', function () {
        home.loadContas();
        contas.editarConta("Conta para alterar", "Cypress Conta Alterada");
        home.validarAlert('Conta atualizada com sucesso');
    })

    it('Should not create an account with same name', function () {
        home.loadContas();
        contas.insertConta('Conta mesmo nome');
        home.validarAlert('Request failed');
    })

    it('Should create a transaction', function () {
        home.loadHome();
        home.loadExtrato();
        home.loadMovimentacaoForm();
        movimentacao.inserirDados('Lançamento Cypress', '1000', 'Cypress Tester', 'Conta para movimentacoes');
        home.validarAlert('Movimentação inserida com sucesso');
        extrato.validarMovimentacao("Lançamento Cypress");
    })

    it('Should get balance', function () {
        saldo.consultaSado("Conta para saldo", "534,00");
        home.loadExtrato();
        extrato.loadMovEdit("Movimentacao 1, calculo saldo")
        movimentacao.editLancamentoStatus()
        home.validarAlert('sucesso');
        home.loadSaldo();
        saldo.consultaSado("Conta para saldo", "4.034,00");
    })

    it('Should remove a transaction', function () {
        home.loadExtrato();
        extrato.removeMovimentacao('Movimentacao para extrato');
        home.validarAlert('Movimentação removida com sucesso');
    })
})