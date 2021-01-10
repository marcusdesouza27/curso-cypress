const nav_bar = '#navbarSupportedContent'
const icon_home = '[data-test=menu-home] > .fas'
const icon_movimentacao = '[data-test=menu-movimentacao] > .fas'
const icon_extrato = '[data-test=menu-home] > .fas'
const icon_settings = '[data-test=menu-settings] > .fas'
const set_contas = '[href="/contas"]'
const set_reset = '[href="/reset"]'
const set_sair = '[href="/logout"]'


export class HomePage {
    verExtrato() {
        cy.get(icon_extrato).click();
    }

    verSaldo() {
        cy.get(icon_home).click();
    }

    verMovimentacao(){
        cy.get(icon_movimentacao).click();
    }

    verContas() {
        cy.get(icon_settings).click();
        cy.get(set_contas).click();
    }

    resetAll() {
        cy.get(icon_settings).click();
        cy.get(set_reset).click();
    }

    logout() {
        cy.get(icon_settings).click();
        cy.get(set_sair).click();
    }
}