/// <reference types="cypress" />

describe('Dinamic Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Testes alternando opção de ${food}`, function () {
            cy.fixture('userData').as('usuario').then(() => {
                cy.get('#formNome').type(this.usuario.nome)
                cy.get('#formSobrenome').type(this.usuario.sobrenome)
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
                cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::Input`).click()
                // cy.xpath(`//label[contains(., ${food})]/preceding-sibling::Input`).click()
                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esporte)

                cy.get('#formCadastrar').click()

                cy.get('#resultado > :nth-child(1)').should('contain.text', 'Cadastrado!')
            })
        })
    })
    it(`Testes selecionando todas com each`, function () {
        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            // cy.get('[name=formComidaFavorita]').click({ multiple: true }) -> Marcando todas as opções
            cy.get('[name=formComidaFavorita]').each($el => {
                // $el.click() --> Funciona mas perde a rastreabilidade do click
                if ($el.val() != 'vegetariano')
                    cy.wrap($el).click();
            })
            cy.get('#formEsportes').select(this.usuario.esporte)
            
            cy.get('#formCadastrar').click()

            cy.get('#resultado > :nth-child(1)').should('contain.text', 'Cadastrado!')
        })

    })


})