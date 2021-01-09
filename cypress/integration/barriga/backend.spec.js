/// <reference types="cypress" />

describe('Testes de API Rest', () => {
    let token
    before(function () {
        cy.fixture('login').then((user) => {
            cy.getToken(user.login, user.pwd)
                .then(key => {
                    token = key
                })
        });
    })

    beforeEach(() => {
        cy.resetRest(token);
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta API rest"
            }
        }).as('response')

        cy.get('@response').then((res) => {
            console.log(res)
            expect(res.status).to.be.equal(201)
            expect(res.statusText).to.be.equal('Created')
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta API rest')
        });
    })

    it('Should update an account', function () {
        cy.getIdConta(token, 'Conta para alterar').then((conta) => {
            cy.log(conta)
            cy.request({
                method: 'PUT',
                url: `/contas/${conta}`,
                headers: { Authorization: `JWT ${token}` },
                body: { nome: "Conta Alterada via REST" }
            }).then(res => {
                expect(res.status).to.be.equal(200)
                expect(res.statusText).to.be.equal('OK')
                expect(res.body).to.have.property('id')
                expect(res.body.nome).to.be.equal('Conta Alterada via REST')
            })
        })
    })

    it('Should not create an account with same name', function () {
        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then((res) => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.statusText).to.be.equal('Bad Request')
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        });
    })

    it('Should create a transaction', function () {
        cy.getIdConta(token, 'Conta para movimentacoes').then((conta) => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    conta_id: conta,
                    data_pagamento: Cypress.moment().add({ days: 2 }).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: 'ApiRest Movimentacao',
                    envolvido: 'Marcus Souza',
                    status: true,
                    tipo: 'REC',
                    valor: '100.00'
                },
                // failOnStatusCode: false
            }).as('response')
            cy.get('@response').then((res) => {
                console.log(res)
                expect(res.status).to.be.equal(201)
                expect(res.statusText).to.be.equal('Created')
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('descricao', 'ApiRest Movimentacao')
                expect(res.body).to.have.property('envolvido', 'Marcus Souza')
                expect(res.body).to.have.property('tipo', 'REC')
                expect(res.body).to.have.property('valor', '100.00')
            })
        })

    })

    it.only('Should get balance', function () {
        cy.getIdConta(token, 'Conta para saldo').then((conta) => {
            cy.request({
                method: 'GET',
                url: '/saldo',
                headers: { Authorization: `JWT ${token}` },
            }).then((res) => {
                let saldo_res = null
                res.body.forEach(l => {
                    if (l.conta === 'Conta para saldo') saldo_res = l.saldo
                });
                expect(res.status).to.be.equal(200);
                expect(res.statusText).to.be.equal('OK');
                expect(saldo_res).to.be.equal('534.00');
            })
        })
    })

    it('Shoul update a transaction', function () {
        cy.request({
            method: 'GET',
            url: "/transacoes",
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: "Movimentacao 1, calculo saldo" }
        }).then((res) => {
            console.log(res.body[0])
            cy.request({
                method: 'PUT',
                url: `/transacoes/${res.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    id: res.body[0].id,
                    usuario_id: res.body[0].usuario_id,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id,
                },
                failOnStatusCode: false
            }).its('status').should('be.equal', 200)

            cy.getIdConta(token, 'Conta para saldo').then((conta) => {
                cy.getSaldoConta(token).then((res) => {
                    let saldo_res = null
                    res.body.forEach(l => {
                        if (l.conta === 'Conta para saldo') saldo_res = l.saldo
                    });
                    expect(saldo_res).to.be.equal('4034.00');
                })
            })
        })
    })
    it('Should remove a transaction', function () {
        cy.getIdMovement(token, 'Conta para saldo').then((movId) => {
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${movId}`,
                headers: { Authorization: `JWT ${token}` },
            }).then((res) => {
                console.log(res)
                expect(res.status).to.be.equal(204)
                expect(res.statusText).to.be.equal('No Content')
            })
        })
    })
})