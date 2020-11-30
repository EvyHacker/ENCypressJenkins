// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js
//Login page gives errors from application

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
  it('finds the content "Login"', function() {
    //cy.visit('https://login.grants.boozallencsn.com')
    cy.visit('https://beta.grants.gov')

  })
   it('can navigate to login page, login and navigate to WS page', () => {

      cy.contains('Login').click();
      cy.url().should('include','auth');
      cy.get('input[name=username]').type('napplicant');
      cy.get('input[name=password]').type('P@ssw0rd0121{enter}');
      cy.contains('Nel1').click();
      cy.contains('My Workspaces').click();
      cy.url().should('include','/applicants');
      })
 
  it('can find and view WS', () => {
    cy.contains('Nel1').click();
      
    cy.get('#overview-extended-search-field-small').click();
    cy.get('#overview-extended-search-field-small').type('2020');
    //cy.contains('Search').click();
    
    //cy.get('.usa-search-small').submit();
    cy.get('.keep-low > button').click();
    cy.get('tr:nth-child(1)').click()

   
        
/*  
        cy.get('.app-user-menu > .usa-accordion > li > .usa-accordion-button > .display_name').click()
     
        cy.get('.usa-accordion > li > #basic-nav-section-one > li:nth-child(2) > a').click()
     
        cy.visit('https://beta.grants.gov/apply')
     
        cy.get('.usa-grid > .align-left > .usa-search > .keep-low > #overview-extended-search-field-small').click()
     
        cy.get('.usa-grid > .align-left > .usa-search > .keep-low > #overview-extended-search-field-small').type('2020')
     
        cy.get('.usa-grid > .align-left > .usa-search > .keep-low > button').click()
     
        cy.get('.usa-table-borderless > tbody > tr:nth-child(1) > td > a').click()
     
     })
  */  
    })
  



  })


 /* it('can navigate to My Profile page', () => {

    cy.contains('Nel1').click();
    cy.pause()
    cy.contains('My Profile').click()
    cy.pause()
    cy.url().should('include','/profile')
 })
*/



/*// <reference types="Cypress" />
describe('The Login Page', function () {
  

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
  //  const { username, password } = this.currentUser

  //  cy.visit('/login')

    cy.get('input[name=username]').type('napplicant')

    // {enter} causes the form to submit
    cy.get('input[name=password]').type('P@ssw0rd0121{enter}')
     cy.pause()
 //  cy.get('#kc-login.btn.btn-primary.btn-block.btn-lg').debug().click()

    // we should be redirected to /dashboard
    cy.url().should('include', '/#')

    // our auth cookie should be present
  //  cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
  
  })
})
context('Home page', () => {
  beforeEach(() => {
    cy.visit('https://beta.grants.gov')
  })

    it('can find and view an opportunity', () => {
      cy.get('#search-field').click();
      cy.get('#search-field').type('grant search string');
      cy.get('.grants-search-btn').click();
      cy.get('.search-result:nth-child(1).opp-Title').click();

      <svg aria-hidden="true" focusable="false
    })

})


*/