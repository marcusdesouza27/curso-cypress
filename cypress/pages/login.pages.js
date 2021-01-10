const input_login = '[data-test=email]'
const input_password = '[data-test=passwd]'
const btn_submit = '.btn'

export class LoginPage {
    insertLogin(user, pass) {
        cy.get(input_login).type(user);
        cy.get(input_password).type(pass);
        cy.get(btn_submit).click();
    }
}