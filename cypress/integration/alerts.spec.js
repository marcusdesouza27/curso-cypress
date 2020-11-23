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

    it('Alert test - com mock', () => {
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            var a = expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })


    })

    it('Confirm - Aceitar', () => {

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it('Confirm - Negar', () => {

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it('Prompt - Aceitar', () => {

        cy.window().then(win => {
            cy.stub(win, 'prompt').as('prompt-mock')
                .returns('42')
        })

        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 42?')
            return false
        })

        // cy.on('window:prompt', msg => {
        //     expect(msg).to.be.equal('Confirm Simples')
        //     return false
        // })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':(')
        })
        cy.get('#prompt').click()
    })

    it.only('Desafio - Alerts', () => {

        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click()
            .then(() => 
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Henrique')

        cy.get('#formCadastrar').click()
        .then(() => 
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Cruz')

        cy.get('#formCadastrar').click()
        .then(() => 
            expect(stub.getCall(2)).to.be.calledWithNew('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain.text', 'Cadastrado!')
    })
})