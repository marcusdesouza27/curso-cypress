 /// <reference types="cypress" />
  
 it('A external test...', () => {

 })

 describe.only('Should group tests....', () => {
    it('A external test...', () => {

    })

 describe('An especific test or more...', () => {
     it.skip('Describe especific test one...', ()=> {

     })

     it('Especific test Two', () => {

     })
 })
 })