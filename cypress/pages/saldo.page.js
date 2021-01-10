const row_conta = nome => `//td[contains(.,"${nome}")]/../td[2]`

export class SaldoPage {
    consultaSado(nome, valorSaldo) {
        cy.xpath(row_conta(nome)).should('contain', valorSaldo);
    }
}