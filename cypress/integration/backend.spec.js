    /// <reference types="cypress" />

    describe('Should teste by API-Rest', () => {
        before(() => {
            // cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        })
    
        beforeEach(() => {
            // cy.reload()
        })

        it.only('Should create an account', () => {
            cy.request({
                method: 'POST',
                // url: 'https://seubarriga.wcaquino.me/logar',
                url: 'https://barrigarest.wcaquino.me/signin',
                body: {
                    email: 'marcusdesouza27@gmail.com',
                    redirecionar: false,
                    senha: 'bassman2712'
                }
            }).its('body.token').should('not.be.empty')
              .then(token => {
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/contas',
                    headers: { Authorization: `JWT ${token}`},
                    body: {
                        nome: "Conta via rest"
                    }
                }).then(res => console.log(res))
              })

           
        })

        it('Should update an account', () => {

        })

        it('Should not create an account with same name', () => {
            
        })

        it('Should create a transaction', () => {

        })
        
        it('Should get balance', () => {

        })

        it('Should remove a transaction', () => {

        })
    })