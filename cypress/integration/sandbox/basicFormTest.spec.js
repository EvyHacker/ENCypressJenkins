Cypress.on('uncaught:exception', (err, runnable) => {
  return true  // return false to continue on exception
})

describe('Experimental tests', function () {

  it('can perform basic operations on web page', () => {
    cy.visit('cypress/fixtures/SimpleWebPage.htm');
    cy.url().should('include', 'SimpleWebPage');
    cy.get('input[name=textField1]').type('Automated data entered');
  })

})


