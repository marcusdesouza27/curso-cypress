/// <reference types="cypress" />

describe('Aulas sobre sincronismo', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Clique com espera por elemento disponível na tela', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funciona')
    })

    it('Retry', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            // .should('not.exist')
            .should('exist')
            .type('Funciona')
    })

    it('Uso do find', () => {
        // cy.get('#buttonList').click()
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 1')

        // cy.get('#lista li span')
        //     .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Usando Wait e TimeOut', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', {timeout: 1000}).should('exist')
        cy.get('#buttonListDOM').click()
        // cy.wait(5000)
        cy.get('#lista li span', { timeout: 10000 })
            .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
    })

    it('Click Retry', () => {
        cy.get('#buttonCount')
            .click()
            .click()
            .should('have.value', 111)
    })

    it.only('Then x Should - Vamos entender', () => {
        // cy.get('#buttonListDOM').click()        
        // cy.get('#lista li span').then($el => {
        //     console.log($el)
        //     expect($el).to.have.length(1)
        // })

        cy.get('#buttonListDOM').then($el => {
            console.log($el)
            expect($el).to.have.length(1)
            return 2
        }).and('not.have.id', 'buttonListDOM')
            .and('eq', 2)
    })
})