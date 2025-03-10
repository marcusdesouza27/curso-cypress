/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {

        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()

        cy.get('#resultado').should('not.have.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    it('Text fields', () => {
        cy.get('#formNome')
            .type('Cypress Test')
            .should('have.value', 'Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('Sugestoes')
            .should('have.value', 'Sugestoes')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        cy.get('[data-cy=dataSobrenome]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value', 'Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{enter}Acerto')
        // .should('have.value', 'Acerto')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}Acerto')
            .should('have.value', 'Acerto')
    })

    it('RadioButton', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get("[name=formSexo]").should('have.length', '2')
    })

    it('Checkbox', () => {
        cy.get('#formComidaVegetariana')
            .check()
            .should('be.checked')

        cy.get("[name=formComidaFavorita]").click({ multiple: true })
        cy.get('#formComidaPizza').should('be.checked')
        cy.get('#formComidaVegetariana').should('not.be.checked')
    })

    it('Test Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')
        //TODO -> Validar as opções do Combo

        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)

        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })

            expect(values).to.include('Superior', 'Mestrado')

        })

    })

    it.only('Combo Multiplo', () => {
        cy.get('[data-testid=dataEsportes]').select(['natacao', 'Corrida'])

        //TODO -> Validar opções do combo múltiplo
        // cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida'])
        cy.get('[data-testid=dataEsportes]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
            expect($el.val()).to.have.length(2)
        })
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['natacao', 'Corrida'])
    })

})