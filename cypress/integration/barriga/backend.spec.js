/// <reference types="cypress" />

describe('Testes funcionais', () => {
    let token
    before(function () {
        cy.fixture('login').then((user) => {
            cy.getToken(user.login, user.pwd)
                .then(key => {
                    token = key
                })
            // cy.loginRest(user.login, user.pwd);
        });
    })

    beforeEach(() => {
        cy.resetRest(token);
    })

    it.only('Should create an account', () => {
            cy.request({
                method: 'POST',
                url: 'contas',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: "Conta API rest"
                }
            }).as('response')

        cy.get('@response').then((res) => {
            console.log(res)
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta API rest')
        });
    })

    it('Should update an account', function () {

    })

    it('Should not create an account with same name', function () {

    })

    it('Should create a transaction', function () {

    })

    it('Should get balance', function () {

    })

    it('Should remove a transaction', function () {

    })
})