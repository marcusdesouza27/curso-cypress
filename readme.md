Curso de Automação com Cypress

Configurações básicas:
- Para instalar o nodejs: https://nodejs.org/en/
    - Para conferir a versão:
        - node -v
        - npm -v

- Para iniciar o projeto cypress na máquina:
    - npm init -y (-y -> para instalar as configurações básicas do cypress)
    - npm install cypress para instalar as dependências do cypress na máquina:

    - Ao final você terá a seguinte estrutura:
        - Pasta ./node_modules
        - pakage.json
        - pakage-lock.json
        
- Para carregar um arquivo de exemplos do cypress:
    -  .\node_modules\.bin\cypress open
   
   ou (Quando der erros - caso do windows)
    - Configure o pakage.json incluindo a linha na Sessão scripts: 
       - "cypress:open": "cypress open"
       - rode o comando: .\node_modules\.bin\cypress open
    - será carregado um console com os exemplos e será criada a pasta ./cypress

    ************************************************

    Dicas úteis:

    Declarar um teste:
    - O teste é iniciado com "it"
    
    Variáveis:
        - let: variáveis que podem ser mudadas
        - const: variáveis que não são alteradas

    declaração de funções:
        - function <nomefunção> (<parâmetros>){}

    - Arrow function:
            sintaxe: const <nomefunção> = (<parâmetros>) => <operadores da função>
            - Quando o operador está imediatamente após o "=>" já fica implícito o "return"
    
    Obs.: Quando a função só tiver um parâmetro, não é necessário colocar entre parêntesis