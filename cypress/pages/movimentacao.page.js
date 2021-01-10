const input_descricao = '[data-test=descricao]'
const input_valor = '[data-test=valor]'
const input_envolvido = '[data-test=envolvido]'
const dropdown_selectConta = '[data-test=conta]'
const btn_status = '[data-test=status]'
const btn_submit = '.btn-primary'
const btn_tipoRec = '[data-test=tipo-receita] > .fas'
const btn_tipoDesp = '[data-test=tipo-despesa]'
const dt_transacao = '[data-test=data-transacao]'
const dt_pagamento = '[data-test=data-pagamento]'

export class MovimentacaoPage {
    inserirDados(desc, valor, envolvido, conta) {
        cy.get(input_descricao).type(desc);
        cy.get(input_valor).type(valor);
        cy.get(input_envolvido).type(envolvido);
        cy.get(dropdown_selectConta).select(conta);
        cy.get(btn_status).click();
        cy.get(btn_submit).click();
    }

    editLancamentoStatus() {
        cy.wait(3000)
        cy.get(btn_status).click();
        cy.get(btn_submit).click();
    }
}