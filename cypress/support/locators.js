const locators = {
    HEADER: {
        BTN_OPTIONS: 'a[class="nav-link dropdown-toggle"]',
        OPT_CONTAS: '[href="/contas"]',
        ICON_HAND$: 'i[class="fas fa-hand-holding-usd"]'
    },
    LOGIN: {
        INPUT_USER: '.input-group > .form-control',
        INPUT_PASSWORD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },

    MESSAGE: '.toast-message',

    CONTAS: {
        TITLE: 'h2',
        TAB_CAB_CONTAS: 'thead > tr > :nth-child(1)',
        TAB_CAB_ACOES: 'thead > tr > :nth-child(2)',
        INPUT_NAME: '[data-test=nome]',
        BTN_SAVE: 'i[class="far fa-save"]'
    },

    MOVEMENT: {
        NAME: '#descricao',
        AMOUNT: '[data-test=valor]',
        ENVOLVIDO: '#envolvido',
        SEL_ACCOUNT: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SAVE: '.btn-primary'
    }

}

export default locators;