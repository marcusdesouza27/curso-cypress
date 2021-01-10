const input_nomeconta = '[data-test=nome]'
const btn_submit = '.btn'
const btn_delete_row = conta => `//td[contains(.,"${conta}")/following-sibling::td/i[@class='far fa-trash-alt']`
const btn_edit_row = conta => `//td[contains(.,"${conta}")]/following-sibling::td/i[@class="far fa-edit"]`

export class ContasPage {
    insertConta(contaNome) {
        cy.get(input_nomeconta).type(contaNome)
        cy.get(btn_submit).click();
    }

    editarConta(nomeconta, novoNome) {
        cy.xpath(btn_edit_row(nomeconta)).click();
        cy.get(input_nomeconta).clear();
        cy.get(input_nomeconta).type(novoNome);
        cy.get(btn_submit).click()
    }
}