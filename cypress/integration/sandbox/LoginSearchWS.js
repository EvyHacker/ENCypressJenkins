Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
  it('URL', function() {
    cy.visit('https://beta.grants.gov')

  })
   it('login and navigate to WS page', () => {

      cy.contains('Login').click();
      cy.url().should('include','auth');
      cy.get('input[name=username]').type('napplicant');
      cy.get('input[name=password]').type('P@ssw0rd0121{enter}');
      //cy.get('input[name=password]').type('P@ssw0rd0114{enter}');
      cy.contains('Nel1').click();
      cy.contains('My Workspaces').click();
      cy.url().should('include','/applicants');
      })
 
  it('can search and view 1st WS', () => {
    cy.get('#overview-extended-search-field-small').click();
    cy.get('#overview-extended-search-field-small').type('2020');
    cy.get('.keep-low > button').click();
    cy.get('tr:nth-child(1)').click()
     })
})


