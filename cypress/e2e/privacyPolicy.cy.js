 it.skip('testa a página da política de privacidade de forma independente', ()=> {
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

    cy.contains('p', 'Talking About Testing')
      .should('be.visible')
  })

  // Exércicio 13.1: lodash 

  Cypress._.times(3, () => {
    
    it.only('Validar a página com o lodash', () => {
       cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

    cy.contains('p', 'Talking About Testing')
      .should('be.visible')
      })
    })