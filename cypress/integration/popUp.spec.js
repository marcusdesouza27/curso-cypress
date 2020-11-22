/// <reference types="cypress" />

describe('Aulas sobre Popup', () => {


    it('Deve testar o popup diretamente...', () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html')

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
        cy.get('#otherButton').click()

    })

    it('Deve verificar se o popup foi invocado...', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })
})

describe('Popup com url', () => {
    beforeEach(() => {
         cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })
    it('Valida popupURL', () => {
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('be.equal', 'https://www.wcaquino.me/cypress/frame.html')
    })

    it('Should access popup dinamycally', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('Funciona')
        })
    })

    it('Forçar abertura do link na mesma pagina', () => {
        
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click()

        cy.get('#tfield').type('Funciona')
    })
})
