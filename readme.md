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

      Variáveis:
        - let: variáveis que podem ser mudadas
        - const: variáveis que não são alteradas

    declaração de funções:
        - function <nomefunção> (<parâmetros>){}

    - Arrow function:
            sintaxe: const <nomefunção> = (<parâmetros>) => <operadores da função>
            - Quando o operador está imediatamente após o "=>" já fica implícito o "return"
    
    Obs.: Quando a função só tiver um parâmetro, não é necessário colocar entre parêntesis

    - Declarar um teste:
        - O teste é iniciado com "it"
    
    - Agrupamento de testes:
        - O agrupamento de testes é efetuado com o describe
        - Pode ser declarado um Describe dentro de outro, para agrupar testes mais específicos, se necessário
    
    - Ignorando testes 
        - Para Ignorar um ou mais testes, pode ser usada a marcação ".skip" após o it/declare
        - Para executar apenas um único teste, utilize a marcação ".only" após o it/declare
        - Caso haja mais de um "only", o último será considerado na execução.
    
   - Asserts
    - Podem ser colocados para o programa fazer comparações
    - Caso tenham vários asserts, falhando um, já falha todo o teste
    - Pode ser colocada a provável mensagem de falha, após o parâmetro a ser comparado

    - Inspecionar elementos
        - Na janela ativa do sistema carregado pelo cypress já existe um object inspector. Basta clicar para encontrar o locator dos elementos
        - O comando/identificador aparece no campo superior e pode ser copiado para o clippboard e colado direto no código

    - Debugar código
        - Podem ser usados os comandos '.debug' ou 'pause'.
            - Com o debug é criado um breakpoint. Os dados referentes à execução são impressos no console. A execução será pausada pelo debug. O gerenciamento do debugger não é totalmente do cypress.
            - com o pause a execução pode ser feita step by step para verificar os resultados de cada ação do teste. O gerenciamento do avanço é feito 100% pelo cypress.