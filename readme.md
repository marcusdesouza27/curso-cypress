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
    -  npm run cypress:open
   
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

    - Formas de busca
        - cy.get
        - cy.contais

    - Hooks
        - Before all [before(() => {})]  --> O que deve ser executado antes de TODOS os testes
        - Before each [beforeEach(() => {})]  --> O que deve ser executado antes de CADA teste

    -Retry
        - Cuidado com o encadeamento do cy.get.
        Quando há um encadeamento, na maioria das vezes retorna o mesmo elemento. Nesse exemplo vai retornar null pq já não existia na linha anterio.
        - Nem sempre o retry vai ser efetivo. Quando o elemento altera o html, por vezes o retry não vai funcionar então deve haver tratamento no código do teste para satisfazer a condição desejada (exemplo: repetir o click em um botão)

    - Find
        - Não recomendado para listas, quando você precisa pegar o segundo ou outro elemento. Nesse caso é melhor dar um cy.get no elemento e um should('contain') na lista para encontrar o valor que você precisa.

    - Wait e TimeOut
        - Para setar o timeOut no teste, basta adicionar o parâmetro {timeout: <milissegundos>}
        - No arquivo de configuração "cypress.json" você pode configurar o timeOut para todos os testes
            - Para isso, basta incluir a chave: "defaultCommandTimeout": <milissegundos>

        -Para o wait a aplicação é "congelada" por x segundos. Não é recomendado, porque a espera ocorre com o elemento sendo encontrado ou não. Gerando uma demora fixa na execução do teste

    - Then x Should (Diferença)
        - Then -
            - Aguarda o fim da execução do get para então executar a função
            - O return pode ser alterado
            - Para blocos que tem busca de outro elemento é recomendado usar o then.

        - Should -
            - Executa ao mesmo tempo que o get está sendo finalizado
            - Sempre vai retornar o mesmo elemento que foi capturado. Ou seja, ele ignora um return dentro do script que poderia alterar o valor
            - Para blocos que tem busca de outro elemento NÃO é recomendado usar o should porque vai entrar em um loop de retentativas.