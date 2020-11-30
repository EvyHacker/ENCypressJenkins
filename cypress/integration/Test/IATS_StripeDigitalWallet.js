/// <reference types="Cypress" />
///<reference types="cypress-iframe" />
import 'cypress-iframe'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false


})

describe('test partial refund for digital wallet payments', () => {
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const donationSingleGoogle = ('en_iats_stripe_google_' + todaysDate + '@tellamazingstories.com')
  const donationSinglePaypal = ('en_iats_stripe_paypal_' + todaysDate + '@tellamazingstories.com')
  const donationRecurCC3220 = ('en_stripe_partial_recur_cc3220_donation_' + todaysDate + '@tellamazingstories.com')
  const donationSingleCC3063 = ('en_stripe_partial_single_cc3063_donation_' + todaysDate + '@tellamazingstories.com')
  const donationRecurCC3063 = ('en_stripe_partial_recur_cc3063_donation_' + todaysDate + '@tellamazingstories.com')
  const donationSingleCC1629 = ('en_stripe_partial_single_cc1629_donation_' + todaysDate + '@tellamazingstories.com')
  const donationSingleCC3155 = ('en_stripe_partial_single_cc3155_donation_' + todaysDate + '@tellamazingstories.com')
  const donationRecurCC3155 = ('en_stripe_partial_recur_cc3155_donation_' + todaysDate + '@tellamazingstories.com')
  const donationSingleCC4242 = ('en_stripe_partial_single_cc4242_donation_' + todaysDate + '@tellamazingstories.com')
  const donationRecurCC4242 = ('en_stripe_partial_recur_cc4242_donation_' + todaysDate + '@tellamazingstories.com')
  //const {GoogleSocialLogin} = require('cypress-social-logins').plugins
 


//   beforeEach(() => {
//     cy.visit('https://accounts.google.com/')
//     cy.get('#identifierId').type('evy@engagingnetworks.net')
//     cy.get('#identifierNext').click()
//     cy.get('#password').type('EnRNDEeQTefZJC9ztGKgTKRC')
//     cy.get('#passwordNext').click()
// })


  it('it submits single sepa_debit transaction', () =>{
   
   // cy.visit(Cypress.env('test') + 'page/13491/donate/1')

  // loginGoogle()
   //cy.visit(Cypress.env('google'))
  //  cy.visit('https://accounts.google.com/')
  // cy.get('#identifierId').type('evy@engagingnetworks.net')
  // cy.get('#identifierNext').click()
  // cy.get('#password').type('EnRNDEeQTefZJC9ztGKgTKRC')
  // cy.get('#passwordNext').click()
  loginGoogle()
   cy.visit(Cypress.env('test') + 'page/13491/donate/1')
    cy.get('#en__field_supporter_emailAddress').clear().type(donationSingleGoogle)
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('111.99')
   cy.get('#en__field_transaction_paycurrency').select('EUR').should('have.value', 'EUR')
   cy.get('button').click()
 

    
  })

  function loginGoogle(){

      
    cy.visit('https://accounts.google.com/')
  cy.get('#identifierId').type('evy@engagingnetworks.net')
  cy.get('#identifierNext').click()
  cy.get('#password').type('EnRNDEeQTefZJC9ztGKgTKRC')
  cy.get('#passwordNext').click()
  }

})
