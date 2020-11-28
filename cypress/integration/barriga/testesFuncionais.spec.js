// Cenários:
// 1- Inserir Conta
// 2- Alterar Conta
// 3- Inserir Conta Repetida
// 4- Inserir Movimentação
// 5- Cálculo de Saldo
// 6- Remover Movimentação



/// <reference types="cypress" />

describe('Testes funcionais', () => {
    beforeEach(function () {
        cy.visit('https://barrigareact.wcaquino.me/')

        cy.fixture('login').as('barriga').then(() => {
            cy.BarrigaLogin(this.barriga.login, this.barriga.pwd)
        })
        cy.BarrigaPopUp('Bem vindo')
    })

    it.only('Should create an account', () => {
        cy.BarrigaReset(). then(() => {
            cy.get('a[class="nav-link dropdown-toggle"]').click()
            cy.get('[href="/contas"]').click()
            cy.get('h2').should('have.text', 'Contas')
            cy.get('.form-control').type('Conta Cypress')
            cy.get('.btn > .far').click()
    
            cy.xpath('//td[contains(., "Conta Cypress")]').should('contain.text', 'Conta Cypress')
    
            cy.BarrigaPopUp('Conta inserida com sucesso')
        })

       

    })

    it.only('Should update an account', function() {

        cy.get('a[class="nav-link dropdown-toggle"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('h2').should('have.text', 'Contas')

        cy.xpath('//td[contains(., "Conta Cypress")]/following-sibling::td/i[@class="far fa-edit"]').click()
        // cy.get('.form-control').type('{del}{selectall}{backspace}')
        cy.get('.form-control').clear()
        cy.get('.form-control').type('Conta Cypress Update')
        cy.get('.btn > .far').click()

        cy.BarrigaPopUp('Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', function() {

        cy.get('a[class="nav-link dropdown-toggle"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('h2').should('have.text', 'Contas')
        cy.get('.form-control').type('Conta Cypress Update')
        cy.get('.btn > .far').click()

        cy.BarrigaPopUp('')
    })

    it('Should create a transaction', function() {
        
        cy.get(':nth-child(2) > .nav-link > .fas').click()
        cy.get('#descricao').type('Conta Teste')
        cy.get('.col-4 > .form-control').type(1000)
        cy.get('#envolvido').type('Test01')
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').select('Conta Cypress Update')
        cy.get('.col-2 > .btn').click()
        cy.get('.btn-primary').click()

        cy.BarrigaPopUp()
        cy.xpath("//span[contains(., 'Conta Test')]").should('contain.text', 'Conta Teste')
    })

    it('Should get balance', function() {
        // cy.fixture('login').as('barriga').then(() => {
        //     cy.BarrigaLogin(this.barriga.login, this.barriga.pwd)
        // })

        // cy.BarrigaPopUp()

    })

    it('Should remove a transaction', function() {
        // cy.fixture('login').as('barriga').then(() => {
        //     cy.BarrigaLogin(this.barriga.login, this.barriga.pwd)
        // })
        
        cy.get(':nth-child(3) > .nav-link > .fas').click()
        cy.xpath("//body/div[@id='root']/div[1]/div[1]/div[2]/div[2]/li[1]/div[1]/div[2]/i[1]").click()

        // cy.get(':nth-child(3) > .nav-link > .fas').click()
        // cy.get('.col > .far').click();
        
        cy.BarrigaPopUp()

    })
})