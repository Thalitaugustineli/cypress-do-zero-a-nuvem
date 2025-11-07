Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {

    firstName: 'Jhon',
    lastName: 'Smith',
    email: 'jhon@examplo.com',
    text: 'Obrigada, Jhon!'

}) => {
    cy.get('#firstName').should('be.visible').type(data.firstName)
    cy.get('#lastName').should('be.visible').type(data.lastName)
    cy.get('#email').should('be.visible').type(data.email)
    cy.get('#open-text-area').should('be.visible').type(data.text)

    // Exemplo: clicar no botão de envio
    cy.get('button[type="submit"]').click()
})