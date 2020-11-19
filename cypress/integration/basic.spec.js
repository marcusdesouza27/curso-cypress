 /// <reference types="cypress" />
 describe('Cypress Basics', () => {
     it('Acessar página e validar um assert no título', () => {
         cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        //  const tittle = cy.title()
        //  console.log(tittle);
        cy.pause()
        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().debug().should('contain', 'Treinamento')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Treinamento')

        //TODO imprimir o log no console
        //TODO escrever o log em um campo de texto
    })

    it('Shoud find and interact with an element', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        // cy.get('NAO EXISTE')
        // cy.get('#buttonSimple').click()
        // cy.get('#buttonSimple').should('have.value', 'Obrigado!')
        cy.get('#buttonSimple')
            .should('have.value', 'Clique Me!')
            .click()
            .should('have.value', 'Obrigado!')
    })
 
 })