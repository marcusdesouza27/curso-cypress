/// <reference types="cypress" />

describe('Work with alerts', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Alert test 1', () => {
        cy.get('#alert').click()

        cy.on('window:alert', msg => {
            console.log(msg)

            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it.only('Alert test - com mock', () => {
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
           var a = expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })


    })
})