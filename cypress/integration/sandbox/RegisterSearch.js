Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
    it('visit home page', () => {
        cy.visit(Cypress.env('grantURL'))   //Home page https://grants.gov
    })
    
        it('login a user', () => {
        if(cy.contains('Welcome to Grants.gov Beta')){
            cy.get('.usa-checkbox__label').click(); 
            cy.get('.margin-right-0').click() 
        }  
        cy.contains('Login').click();  
        cy.get('#username').type(Cypress.env('userUpWork'))  
        cy.get('#password').type(Cypress.env('passwordUpWork')).type('{enter}')

    })

    // it('validates home page menu and content', () => {
    //     cy.contains('Login').click();  
    //     cy.url().should('include','login');
        

   // })
})
    
 

 