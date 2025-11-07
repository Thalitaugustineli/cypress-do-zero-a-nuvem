  // Seção 2: Seu primeiro Teste escrito com Cypress: 

  describe('Central de Atendimento ao Cliente TAT', () => {

  // Executa antes de cada teste
  beforeEach(() => {
    cy.visit('./src/index.html') // abre a página antes de cada caso de teste
  })

  // 🧩 Exercício 1: Verificar o título da página
  it('Verifica o título da página', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // SEÇÃO 3: Localizando, digitando e clicando em elementos

  // 🧩 Exercício 2: Preencher campos e enviar formulário
  it('Preenche os campos obrigatórios e envia o formulário', () => {

    // Preechendo o formulário
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')

    cy.get('#lastName')
      .should('be.visible')
        .type('Augustineli')

    cy.get('#email')
      .should('be.visible')
        .type('thalita@example.com')

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Estou testando o formulário do TAT com Cypress!')

    // Exemplo: clicar no botão de envio
    cy.get('button[type="submit"]')
      .click()

    // Validação de Sucesso
    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso')  // Linha incluída por IA
  })

  
  // Exercício Extra 1 - Adicionando Delay no type
  it('Preenche os campos obrigatórios e envia o formulário (texto Longo e Delay)', () => {

    const longText = Cypress._.repeat('Estou testando o formulário do TAT com Cypress!', 10) // Escrevendo um texto longo e repetindo 10x

    // Preechendo o formulário
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')

    cy.get('#lastName')
      .should('be.visible')
      .type('Augustineli')

    cy.get('#email')
      .should('be.visible')
      .type('thalita@example.com')
    cy.get('#open-text-area')
      .should('be.visible')
      .type(longText, {delay:0})      // Incluindo um delay de 0 para ele fazer rápido

    // Exemplo: clicar no botão de envio
    cy.get('button[type="submit"]')
      .click()

    // Validação de Sucesso
    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso')
  })

  // Exercício Extra 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida ', () => {
    
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')

    cy.get('#lastName')
      .should('be.visible')
      .type('Augustineli')

    cy.get('#email')
      .should('be.visible')
      .type('thalitaexample,com')  // Preechendo e-mail incorreto

     cy.get('#open-text-area')
      .should('be.visible')
      .type('Estou testando o formulário do TAT com Cypress!')

    
    cy.get('button[type="submit"]')
      .click() // Exemplo: clicar no botão de envio

    // Validação de Erro
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
  })

  // Exercício Extra 3 - Validação do campo de telefone 
  it('Validar Campo de Telefone - com Letras ', () => {
    cy.get('#phone')
      .should('be.visible')
      .type('ABCDEF')
      .should('have.value', '')
  })

  // Exercício Extra 4 - Marcar checkbox do Telefone
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário | teste negativo', () => {
  
    // Preechendo o formulário
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')
    cy.get('#lastName')
      .should('be.visible')
      .type('Augustineli')

    cy.get('#email')
      .should('be.visible')
      .type('thalita@example.com')

    cy.get('#phone-checkbox')
      .should('be.visible')
      .click()

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Estou testando o formulário do TAT com Cypress!')

    // Exemplo: clicar no botão de envio
    cy.get('button[type="submit"]')
      .click()

    // Validação de Erro
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')

  })

  // Exercício Extra 5 - Funcionalidade Clear
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  
    // Preechendo o formulário
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')
      .should('have.value', 'Thalita')
      .clear()
      .should('have.value', '')
    
    cy.get('#lastName')
      .should('be.visible')
      .type('Augustineli')
      .should('have.value', 'Augustineli')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .should('be.visible')
      .type('thalita@example.com')
      .should('have.value', 'thalita@example.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .should('be.visible')
      .type('11954898930')
      .should('have.value', '11954898930')
      .clear()
      .should('have.value', '')

  })

    // Exercício Extra 6 - Enviar formulário sem nenhum campo preenchido
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    // Exemplo: clicar no botão de envio
          cy.get('button[type="submit"]')
            .click()

          // Validação de Erro
          cy.get('.error')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')

  })

    // Exercício Extra 7 - Comandos costumizados SEM A INCLUSÃO DO DATA

    // Skip para pular o teste
     
    it.skip('envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()
          // Validação de Erro
      cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso')
  })


    // Exercício Extra 7.2 - Passando as informações com varíaveis

    it.skip('envia o formuário com sucesso usando um comando customizado', () => {
      const data = {
        firstName: 'Gilberto',
        lastName: 'Augustineli',
        email: 'thalita@exaemplo.com',
        text: 'Obrigada!'
      }

      cy.fillMandatoryFieldsAndSubmit(data) // inclusão do const acima
      
          // Validação de Erro
      cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso')
  })


// Exercício Extra 7.3 - Comandos costumizados com a inclusão de informações padrão
     
  it('envia o formuário com sucesso usando um comando customizado', () => {
      cy.fillMandatoryFieldsAndSubmit()
          // Validação de Erro
      cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso')
  })

  // Exércicio 8: cy.contains
      it('Validando o cy.contains | Button ', () => {

     // Preechendo o formulário
    cy.get('#firstName').should('be.visible').type('Thalita')
    cy.get('#lastName').should('be.visible').type('Augustineli')
    cy.get('#email').should('be.visible').type('thalita@example.com')
    cy.get('#phone-checkbox').should('be.visible').click()
    cy.get('#open-text-area').should('be.visible').type('Estou testando o formulário do TAT com Cypress!')

    // Exemplo: clicar no botão de envio
    cy.contains('button', 'Enviar').click()  // Ajuda usar o Texto para validar!! 

    // Validação de Erro
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')

  })

  // SEÇÃO 4: Selecionando opções em campos de seleção suspensa

  // Exércicio 9: .select() // Selecionando pelo Nome

      it('seleciona um produto (YouTube) por seu texto | .select() - Caixa suspensa ', () => {

     // Selecionando a Opção: YouTube
     cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

   // Exércicio 9.1: .select() // Selecionando pelo Value

      it('seleciona um produto (Mentoria) por seu valor (value)', () => {

     // Selecionando a Opção: value 'mentoria'
     cy.get('#product')
      .select('mentoria')           // Pelo Value 
      .should('have.value', 'mentoria')
  })

   // Exércicio 9.2: .select() // Selecionando pelo Indice
  
      it('seleciona um produto (Blog) por seu índice | .select() - Caixa suspensa ', () => {

     // Selecionando a Opção: Blog indice 1
     cy.get('#product')
      .select(1)        // usar número sem aspas ''
      .should('have.value', 'blog')
  })

  // SEÇÃO 5:  Marcando inputs do tipo rádio

     // Exércicio 10: Selecionando um checkbox
  
      it('marca o tipo de atendimento "Feedback"', () => {

     // Selecionando a opção de checkbox
     // cy.get(':nth-child(4) > input')     // Não recomendado usar este seletor devido a qualquer mudança no código pode afetar
     cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('be.checked')     // Valida se campo está marcado
  })

       // Exércicio 10.1: Selecionando todos os Radio
  
      it('marca o tipo de atendimento "Feedback"', () => {

     // Selecionando a opção de checkbox
     cy.get('input[type="radio"]')    // Pega todos os radio
        .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked') 
        })
  })

  // SEÇÃO 6: Marcando e desmarcando campos do tipo caixa de seleção

     // Exércicio 11: .uncheck() // desmarcando
  
      it('marca ambos checkboxes, depois desmarca o último', () => {

        //cy.get('#email-checkbox')   // Não será usado devido a ter vários seletores
    cy.get('input[type="checkbox"]')      // pega todos os chechbox
        .check()
        .should('be.checked')
        .last()                       // Pega o último
        .uncheck()                    // desmarca o último
        .should('not.be.checked')     // verifica se está realmente desmarcado
  })

       // Exércicio 11.1: .uncheck() // desmarcando
  
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Thalita')

    cy.get('#lastName')
      .should('be.visible')
      .type('Augustineli')

    cy.get('#email')
      .should('be.visible')
      .type('thalita@example.com')
    
    cy.get('#phone-checkbox')
       .should('be.visible')
       .check() // Troca do click por check

    cy.get('#open-text-area')
      .should('be.visible')
      .type('Estou testando o formulário do TAT com Cypress!')

    // Exemplo: clicar no botão de envio
    cy.get('button[type="submit"]')
      .click()

    // Validação de Mensagem de Erro
    cy.get('.error')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
  })

  // SEÇÃO 7: Fazendo uploand de arquivos no Cypress

     // Exércicio 11: Realizar o upload de um arquivo pelo Cypress
  
      it('seleciona um arquivo da pasta fixtures', () => {
        
        // Realizando o upload dos arquivos
        cy.get('#file-upload')                // pegando o id que está no html
          .selectFile('cypress/fixtures/example.json')        // passando o caminho do arquivo
          .should(input => {
            // console.log()  -> Apresenta a informação que está no console do navegador
            expect(input[0].files[0].name).to.equal('example.json')
          })       
  })

       // Exércicio 11.1: Realizar o upload do modo a arrastar o arquivo drag-and-drop
  
      it('Seleciona um arquivo simulando um drag-and-drop', () => {
        
        // Realizando o upload dos arquivos
        cy.get('#file-upload')                // pegando o id que está no html
          .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})        // O action simula o arrastar o arquivo
          .should(input => {
            // console.log()  -> Apresenta a informação que está no console do navegador
            expect(input[0].files[0].name).to.equal('example.json')
          })       
  })

  // Exercício: 11.2 - Não declarar o caminho do json, apenas informar que ele esta na fixture.json
  
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
    cy.fixture('example.json').as('sampleFiles')        // Não sei o que é?

    cy.get('#file-upload')                // pegando o id que está no html
          .selectFile('@sampleFiles')        // Não precisa passar o caminho, pois acima está informando
          .should(input => {
            // console.log()  -> Apresenta a informação que está no console do navegador
            expect(input[0].files[0].name).to.equal('example.json')
  })
})

// SEÇÃO 8: Lidando com links que abrem em outra aba do navegador
  
// Exercício: 12 - Lidando com links 
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
    // cy.get('a')      // Seletor muito genérico
    cy.contains('a', 'Política de Privacidade')      // Está procucurando uma url que contenha esse termo
      .should('have.attr', 'href', 'privacy.html')    // deve ter...
      .and('have.attr', 'target', '_blank')         // .and() deve ter 
  })

  // Exercício: 12.1 - Lidando com links 
  it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
    // cy.get('a')      // Seletor muito genérico
    cy.contains('a', 'Política de Privacidade')      // Está procucurando uma url que contenha esse termo
      .invoke('removeAttr', 'target')               // remove o atributo
      // .should('have.attr', 'href', 'privacy.html')
       .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

    // Exercício: 12.2 - Testanto de forma independente a página de Pólitica de privacidade: cypress/e2e/privacePolicy.cy.js

    // SEÇÃO 8: Simulando as dimensões de um dispositivo móvel no Cypress

    // Exercício 13 - Configerar o Cypress pelo viewport
    // Foi criado a linha no documento packge.json para abrir no modo Mobile com o viewport aplicado
    //    "cy:open:mobile": "cypress open --config viewportWidth=375,viewportHeight=600",


   // Exercício: 13.1 - Rodar os Testes no modo headlls 

   // Gravar um vídeo da execução, ir no config e por "video:true"
   //Foi criado a linha no documento packge.json 

   // SEÇÃO 9: Criar uma documentação dos testes 

   // Exercício: 14 - Criar um md

   // SEÇÃO 10: Integração Continua CI com Github Actions

   // Exercício 15: Subir um arquivo de .github/workflows e incluir uma validação

   // Incluso novos documentos gitHub e rodando dentro do GitHub

    


 

})

    


