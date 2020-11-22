 /// <reference types="cypress" />
 describe('Cypress Basics', () => {
     it.only('Acessar página e validar um assert no título', () => {
         cy.visit('https://www.wcaquino.me/cypress/componentes.html')

         const tittle = cy.title()
         console.log(tittle);
        
        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Treinamento')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Treinamento')

        
        //TODO imprimir o log no console
        // Usando o "then" da promise 
        cy.title().then(title => {
            console.log(title)
        })

        // Usando o "should" da promise
        cy.title().should(title => {
            console.log(title)
        })

        // TODO escrever o log em um campo de texto
        let syncTitle

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
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