/// <reference types="Cypress" />

import { generateRandomString } from '../support/utils';

describe('Donate 866', function()  {
 // beforeEach(() => {
    //cy.visit('/page/866/donate/1?mode=DEMO')

  it('starts with correct page 1 defaults', function() {
    cy.visit('/page/866/donate/1?mode=DEMO')
    cy.get('#en__field_transaction_donationAmt').select('10')
    cy.get('#en__field_supporter_title').select('Ms.')
    cy.get('#en__field_supporter_firstName').type('Evy')
    cy.get('#en__field_supporter_lastName').type('Tester')
    cy.get('#en__field_supporter_emailAddress').type('evy@engagingnetworks.net')

    fillPage1Form()
    cy.get('button').click()
    
    cy.location('pathname').should('eq', '/page/866/donate/2')

    fillPage2Form()
    cy.get('button').click()
   

})   

    //cy.location('pathname').should('have','www.sandbox.paypal.com/')
   // function PayPal() {
        it('Logins to PayPal', function() {
        cy.get('#email').clear()
        cy.get('#email').type('en_test_buyer@engagingnetworks.online', { delay: 2 })
        cy.get('#password').type('Testing123**', { delay: 0 })
        cy.get('#btnLogin').click()
        //cy.wait(80000)
        cy.get('#btnSubmit').click({ timeout: 40000 }) 
        

})
  function fillPage1Form() {
    
    cy.get('#en__field_transaction_othamt1').type('other amount test1')
    cy.get('#en__field_transaction_othamt2').type('other amount test2')
    cy.get('#en__field_transaction_othamt3').type('other amount test3')
    cy.get('#en__field_transaction_othamt4').type('other amount test4')
    cy.get('#en__field_supporter_appealCode').type('appeal code1')
    cy.get('#en__field_transaction_dirgift').type('gift1')
    cy.get('#en__field_transaction_comments').type('test comments')
    cy.get('#en__field_transaction_taxdeductible').type('Y')
    

}

function fillPage2Form() {
    
    cy.get('#en__field_supporter_address1').type('1 Hilltop Rd')
    cy.get('#en__field_supporter_city').type('Baltimore')
    cy.get('#en__field_supporter_region').select('MD')
    cy.get('#en__field_supporter_postcode').type('20001')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_transaction_recurrday').type('23')
    cy.get('#en__field_transaction_paymenttype').select('Paypal')
}  
})