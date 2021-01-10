const input_nomeconta = '[data-test=nome]'
const btn_submit = '.btn'

export class ContasPage {
    insertConta() {
        cy.get(input_nomeconta).type('Conta Cypress Test')
        cy.get(btn_submit).click();
    }
}