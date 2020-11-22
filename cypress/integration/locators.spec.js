/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Locators with JQSelector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0)  td:nth-child(3)  > input').click()
        cy.get('[onclick*="Francisco"]').click()
        cy.get('#tabelaUsuarios td:contains(\'Doutorado\'):eq(0) ~ td:eq(3) > input').type('teste')
        cy.reload()
        cy.get('#tabelaUsuarios tr:contains(\'Doutorado\'):eq(0) td:eq(6)').type('por linha')
    })

    it('using xpath', () => {
        cy.xpath('//input')
    })
})