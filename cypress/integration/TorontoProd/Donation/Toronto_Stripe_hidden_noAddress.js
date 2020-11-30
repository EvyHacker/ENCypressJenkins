/// <reference types="Cypress" />

describe('test partial refund for Stripe gateway for Single and Recurring transactions', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const donationStripe = ('st_stripe_noaddress_hidden_donation_' + todaysDate + '@tellamazingstories.com')
    const donationStripeSepa = ('st_stripe_sepa_noaddress_hidden_donation_' + todaysDate + '@tellamazingstories.com')
    

    beforeEach(() => {
        cy.visit(Cypress.env('toronto')+'page/24389/donate/1')
      })

    it('can submit single donation', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(donationStripe)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/24389/donate/2')
        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__item--other > .en__field__input').type('100.99')
        cy.get('#en__field_transaction_ccnumber').type('4000000000003220')
        cy.get('#en__field_transaction_ccvv').type('123')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2022')
        
        cy.get('button').click()
        cy.wait(3000)
        cy.failForStripe3dIframe().find("[id*=test-source-authorize]").click()

        cy.location('pathname').should('include', '/page/24389/donate/3')

        cy.get('.en__component--column > .en__component').as('thankYouPage')
        cy.get('@thankYouPage').contains( '61702')
        cy.get('@thankYouPage').contains( 'CREDIT_RECURRING')
        cy.get('@thankYouPage').contains( 'EUR')
        cy.get('@thankYouPage').contains( 'Stripe Gateway')
        cy.get('@thankYouPage').contains( '€100.99')
        cy.get('@thankYouPage').contains( 'TEST: visa')
        cy.get('@thankYouPage').contains( 'DAILY')
  
    })

    it('it submits single sepa_debit transaction', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(donationStripeSepa)
        cy.get('button').click()
        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__item--other > .en__field__input').type('100.99')
        cy.get('#en__field_transaction_paymenttype').select('sepa_debit').should('have.value', 'sepa_debit')
        cy.wait(2000)
        context('Actions', () => {
          cy.getWithinIframe('[name="iban"]').type('NL39RABO0300065264')
    })
        cy.get('button').click()
        cy.location('pathname').should('include', '/page/24389/donate/3')

        cy.get('.en__component--column > .en__component').as('thankYouPage')
        cy.get('@thankYouPage').contains( '61702')
        cy.get('@thankYouPage').contains( 'BANK_RECURRING')
        cy.get('@thankYouPage').contains( 'EUR')
        cy.get('@thankYouPage').contains( 'Stripe Gateway')
        cy.get('@thankYouPage').contains( '€100.99')
        cy.get('@thankYouPage').contains( 'TEST: sepa_debit')
        cy.get('@thankYouPage').contains( 'DAILY')
  
      })

})

describe('it validates no address for supporter and updates CC info', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const donationStripe = ('st_stripe_noaddress_hidden_donation_' + todaysDate + '@tellamazingstories.com')
    const donationStripeSepa = ('st_stripe_sepa_noaddress_hidden_donation_' + todaysDate + '@tellamazingstories.com')
    const donationTypeRecur = ('.gadget__recurringDonations__recurring__type')
  
      
    it('searches for the stripe transaction and completes CC update and supporter information', () => {
     
      logIn()
      cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(donationStripe)
      cy.get('.userInput__action > .button').click()
      cy.get('.icon--search--color').click()
      cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
      .then((text) => {
        expect(text.trim()).contains('fcr')
    })

    validateNoAddress()

    cy.get(donationTypeRecur).eq(0).click()
    cy.get('.gadget__recurringDetail__optimal__head--update').click()
    cy.get('#gadget__recurringDetail__optimal--street').type('Stripe Street')
    cy.get('#gadget__recurringDetail__optimal--city').type('Noaddress')
    cy.get('#gadget__recurringDetail__optimal__country_chosen > .chosen-single > span').click()
    cy.get('[data-option-array-index="2"]').click()
    cy.get('#gadget__recurringDetail__optimal--state').type('London')
    cy.get('#gadget__recurringDetail__optimal--zip').type('D123AA')
    cy.get('#gadget__recurringDetail__optimal--cc').type('4242424242424242')
    cy.get('#gadget__recurringDetail__optimal--expiry--month').select('10').should('have.value', '10')
    cy.get('#gadget__recurringDetail__optimal--expiry--year').select('2023').should('have.value', '2023')
    cy.get('.gadget__recurringDetail__optimal__body__actions--save').click()
    cy.reload()

    cy.get('.gadget__recurringDonations__recurring').eq(0).invoke('text')
    .then((text) => {
        expect(text.trim()).contains('CANCELED')
    })

})

it('validates sepa_debit transaction and blank address for supporter', () => {

    logIn()
      cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(donationStripeSepa)
      cy.get('.userInput__action > .button').click()
      cy.get('.icon--search--color').click()
      cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
      .then((text) => {
        expect(text.trim()).contains('fbr')
    })

    validateNoAddress()

   cy.get(donationTypeRecur).eq(0).click()
   cy.get('.gadget__recurringDetail__history__item').eq(1).click()
   cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
   cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 EUR')
   cy.get('#refund__amount').type('20.99')
   cy.get('label > input').check()
   cy.get('.gadget__receipt__field__input__receipt').select('refund receipt 3 58')
   cy.get('.gadget__receipt__field__input__template').select('Default for Donation Refund (single and recurring)').should('have.value', '1')
   cy.get('.gadget__receipt__buttons__send').click()
   cy.get('.message__actions__confirm').click()
   cy.wait(5000)
   cy.get('.enOverlay__popup__close').click()
   cy.reload()
   cy.get('.gadget__transactionHistory__transaction__field__type').eq(0).invoke('text')
      .then((text) => {
        expect(text.trim()).contains('rfd')
    })
    cy.get('.gadget__transactionHistory__transaction__field__type').eq(0).click()
    cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 EUR')
    logOut()

})
    
function logIn(){
       
    cy.visit(Cypress.env('dallasLogIn')+'#login')
    if(cy.location('pathname').should('have', '#login')){
     cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
     cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
     cy.get('.button').click()
    } else{cy.visit(Cypress.env('dallasLogIn') + '#dashboard', {delay : 3000})
    }
  }
  function logOut(){

    cy.get('.dashboard__action--close').click()
    cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
    cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
    cy.url().should('contain','#login')
  }

  function validateNoAddress(){

    cy.get('.fields > :nth-child(7) > .field > .fui__field > .fui__subfield > .f').should('be.empty')
    cy.get('.fields > :nth-child(8) > .field > .fui__field > .fui__subfield > .f').should('be.empty')
    cy.get('.fields > :nth-child(9) > .field > .fui__field > .fui__subfield > .f').should('be.empty')
    cy.get('.fields > :nth-child(12) > .field > .fui__field > .fui__subfield > .f').should('be.empty')

  }
})