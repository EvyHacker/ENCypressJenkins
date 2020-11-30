/// <reference types="Cypress" />

context('Route', () => {
  it.only('reroute server request', () => {
    cy.visit('https://example.cypress.io/commands/network-requests')

    cy.server()
    cy.route('https://jsonplaceholder.cypress.io/comments/1', 'fixture:example.json')
    // cy.fixture('example.json').as('exampleJson')

    cy.get('.network-btn').click()
  })
})
