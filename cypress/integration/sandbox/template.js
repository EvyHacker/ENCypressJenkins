Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
  it('URL', function() {
    //cy.visit('https://login.grants.boozallencsn.com') //to parametarize
    cy.visit('https://beta.grants.gov')

  })
   it('login and create WS', () => {

      cy.contains('Login').click();
      cy.url().should('include','auth');
      cy.get('input[name=username]').type('napplicant');//to parametarize
      cy.get('input[name=password]').type('P@ssw0rd0121{enter}');//to parametarize
      cy.contains('Nel1').should('be.visible');//assertion - also to be parametarized
      cy.contains('Nel1').click()  
      cy.contains('My Workspaces').click();
      cy.url().should('include','/applicants');
      cy.contains('Create Workspace').click();
      cy.get('#fon').click();
      cy.get('#fon').type('SF424-11-15');//to parametarize
      cy.get('#appName').click();
      cy.get('#oppPackageListOptions').select('SF424 Package');
      cy.get('#appName').type('26022020 Nel General'); //to parametarize
      cy.contains('Link to an Organization').click();
      cy.contains('FRENCH OIL MILL MACHINERY COMPANY, THE').click();//parametarize
      cy.get('#createWorkspaceBtn').click();
      cy.contains('Overview').should('be.visible'); //assertion
      })
 
  })


