const locators = {
    MESSAGE: '.toast-message',
    LOGIN: {
        INPUT_USER: '.input-group > .form-control',
        INPUT_PASSWORD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },
    
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        RESET: '[href="/reset"]',
        BTN_OPTIONS: 'a[class="nav-link dropdown-toggle"]',
        OPT_CONTAS: '[href="/contas"]',
        ICON_HAND$: 'i[class="fas fa-hand-holding-usd"]',
        ICON_HISTORY: '[data-test=menu-extrato]'
    },

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
        BTN_SAVE: '.btn-primary',
        MOV_LIST: '.list-group > li',
        DESCRICAO: '[data-test=descricao]',
        TEST_MOVIMENT: conta => `(//span[contains(., "${conta}")])[1]`,
        ICON_DELETE: conta => `//span[contains(.,"${conta}")]/../../..//i[@class='far fa-trash-alt']`,
        ICON_UPDATE: conta => `//span[contains(.,"${conta}")]/../../..//i[@class='fas fa-edit']`,
    },

    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(.,"${nome}")]/../td[2]`
    }

}

export default locators;