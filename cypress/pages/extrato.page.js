const row_movimentacao = conta => `(//span[contains(., "${conta}")])[1]`
const icon_delete_mov = conta => `//span[contains(.,"${conta}")]/../../..//i[@class='far fa-trash-alt']`
const icon_edit_mov = conta => `//span[contains(.,"${conta}")]/../../..//i[@class='fas fa-edit']`

export class ExtratoPage {
    validarMovimentacao(lancamento) {
        cy.xpath(row_movimentacao(lancamento)).should('contain.text', lancamento);
    }

    loadMovEdit(lancamento) {
        cy.xpath(icon_edit_mov(lancamento)).click();
    }

    removeMovimentacao(lancamento) {
        cy.xpath(icon_delete_mov(lancamento)).click();
    }
}