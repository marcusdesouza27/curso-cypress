describe('Dinamic Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    it('Voltando ao passado', () => {
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '25/11/2020')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2003, 2, 26, 15, 30, 30) //O mês é indexado a partir de zero
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '31/12/1969')
    })

    it.only('Teste para avançar no tempo', () => {
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16063')
        cy.get('#resultado > span').invoke('text').should('gt', 1606358729046)

        // cy.clock()
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('gt', 1606358729046)
    })
})