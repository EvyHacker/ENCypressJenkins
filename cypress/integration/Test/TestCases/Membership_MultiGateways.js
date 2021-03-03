/// <reference types="Cypress" />
///<reference types="cypress-iframe" />
import 'cypress-iframe'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false

})

describe('test membership with multi gateways', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const membershipStripe3D = ('en_stripe_membership_stripe_3d' + todaysDate + '@engagingnetworks.online')
    const donationRecur = ('en_stripe_partial_recur_donation_' + todaysDate + '@engagingnetworks.online')
    

 beforeEach(() => {
        cy.visit(Cypress.env('test')+'page/13585/membership/1')
      })

    it('can submit 3D transaction when currency = RUB, 4000000000003220', () =>{


        cy.get('.en__button').eq(0).click()
        cy.url().should('eq', 'https://politicalnetworks.com/page/13585/membership/2?membershipTypeId=106')
        cy.get('#en__memselector__radio--229').check()
        cy.get('form').contains('Choose your own additional donation amount').click()
        cy.get('.en__field__item--other > .en__field__input').type('100.99')
        cy.get('#en__field_supporter_emailAddress').type(membershipStripe3D)
        cy.get('button').click()
        cy.url().should('eq', 'https://politicalnetworks.com/page/13585/membership/3')
        cy.get('.en__component--row--1 > .en__component--column > .en__component').invoke('text').as('OrderSummary')
        cy.get('@OrderSummary').should('include', 'Test membership - 48 months')
        cy.get('@OrderSummary').should('include', '$325.00')
        cy.get('@OrderSummary').should('include', 'Additional donation')
        cy.get('@OrderSummary').should('include', '$100.99')
        cy.get('@OrderSummary').should('include', 'Total:')
        cy.get('@OrderSummary').should('include', '$425.99')
        cy.get('#en__field_transaction_paycurrency').type('RUB')
        cy.get('#en__field_transaction_ccnumber').type('4000000000003220')
        cy.get('.en__submit > button').click()
        cy.waitForStripe3dIframeMember().find("[id*=test-source-fail]").click()
        cy.get('.en__error').should('have.text', 'We are unable to authenticate your payment method. Please choose a different payment method and try again.')
        cy.get('.en__submit > button').click()
        cy.waitForStripe3dIframe().find("[id*=test-source-authorize]").click()
        cy.url().should('eq', 'https://politicalnetworks.com/page/13585/membership/4')
        cy.get('.en__component--column').as('ThaankYouPage')
        cy.get('@ThaankYouPage').should('include.text', 'CREDIT_SINGLE')
        cy.get('@ThaankYouPage').should('include.text', 'Stripe Gateway')
        cy.get('@ThaankYouPage').should('include.text', 'RUB325.00')
        cy.get('@ThaankYouPage').should('include.text', 'RUB425.99')
        cy.get('@ThaankYouPage').should('include.text', '100.99')
        cy.get('@ThaankYouPage').should('include.text', 'TEST: visa')

        // cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        // cy.get('[style="flex-grow:0; flex-shrink:0; flex-basis:50%;"] > :nth-child(2) > .en__field--withOther > .en__field__element > .en__field__item--other > .en__field__input')
        // .type('100.99')
        // cy.get('#en__field_supporter_emailAddress').clear().type(donationSingle)
        // cy.get('#en__field_transaction_recurrpay1').check()
        // cy.get('#en__field_transaction_ccexpire').type('10')
        // cy.get(':nth-child(3) > .en__field__input').type('2022')
        // cy.get('button').click()

        // cy.location('pathname').should('include', '/page/13183/donate/2')

        // cy.get('.en__component--column > .en__component').as('thankYouPage')
        // cy.get('@thankYouPage').contains( '8991')
        // cy.get('@thankYouPage').contains( 'CREDIT_SINGLE')
        // cy.get('@thankYouPage').contains( 'USD')
        // cy.get('@thankYouPage').contains( 'Stripe Gateway')
        // cy.get('@thankYouPage').contains( '$100.99')
        // cy.get('@thankYouPage').contains( 'visa')
      })
    })