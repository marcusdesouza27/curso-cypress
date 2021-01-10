const nav_bar = '#navbarSupportedContent'
const icon_home = '[data-test=menu-home]'
const icon_movimentacao = 'i[class="fas fa-hand-holding-usd"]'
const icon_extrato = '[data-test=menu-extrato] > .fas'
const icon_settings = '[data-test=menu-settings] > .fas'
const set_contas = '[href="/contas"]'
const set_reset = '[href="/reset"]'
const set_sair = '[href="/logout"]'
const alerts = '.toast-message'
const icon_popupClose = '.toast-close-button'


export class HomePage {
    loadHome(){
        cy.get(icon_home).click().then(() => {
            expect(nav_bar).exist
        })
    }

    loadExtrato() {
        cy.get(icon_extrato).click();
    }

    loadSaldo() {
        cy.get(icon_home).click();
    }

    loadMovimentacaoForm(){
        cy.get(icon_movimentacao).click();
    }

    loadContas() {
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

    validarAlert(mensagem) {
        cy.get(alerts)
            .should('exist')
            .should('contain', mensagem)
    }
}