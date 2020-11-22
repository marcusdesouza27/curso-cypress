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

    it.only('using xpath', () => {
        cy.xpath("(//input[@type='button'][@value='Clique aqui'])[3]") // Não muito recomendávelpq os as posições na tab podem  variar
        cy.xpath('//input[contains(@onclick,"Francisco")]')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,"Francisco")]/..//input[@type="text"]')
        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(.,\'Doutorado\')])[2]/..//input[@type="checkbox"]')
        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(.,\'Doutorado\')])[2]/..//input[@type="checkbox"]')
        cy.xpath('//td[contains(.,"Usuario A")]/following-sibling::td[contains(.,"Mestrado")]/..//input[(@type="text")]').type("TEST")
    })
})