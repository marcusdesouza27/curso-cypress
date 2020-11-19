 /// <reference types="cypress" />
 describe('Cypress Basics', () => {
     it('"Acessar página e validar um assert no título', () => {
         cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        //  const tittle = cy.title()
        //  console.log(tittle);

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Treinamento')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Treinamento')

        //TODO imprimir o log no console
        //TODO escrever o log em um campo de texto
     })
 })