/// <reference types="cypress" />

describe('Aulas sobre Iframes', () => {


    it('Iframe...', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Funciona?')
                .should('have.value', 'Funciona?')

            cy.on('window:alert', msg => {
                expect(msg).to.be.equal('Alert Simples')
            })
            // cy.wrap(body).find('#otherButton').click()
            //Aqui temos um problema para clicar no ok do alert
            //O alert está numa janela externa não gerenciada pelo cypress
        })
    })

    it('Iframe 2...', () => {
        //Aqui é um exemplo de como podemos testar algo dentro do iFrame
        cy.visit('https://www.wcaquino.me/cypress/frame.html')

            cy.on('window:alert', msg => {
                expect(msg).to.be.equal('Click OK!')
            })
            cy.get('#otherButton').click()
    })


})
