/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('test test partial refund for Stripe gateway sepa_debit for Single and Recurring transactions', ()=>{
    const todaysDate = Cypress.moment().format('YYYY_MM_DD')
    const tomorrowsDate = Cypress.moment().add(1, 'day').format('MM/DD/YYYY')
    const donationSingle = ('en_stripe_sepa_single_donation_' + todaysDate + '@engagingnetworks.online')
    const donationRecur = ('en_stripe_sepa_recur_donation_' + todaysDate + '@engagingnetworks.online')
    

    beforeEach(() => {
        cy.visit(Cypress.env('test')+'page/13346/donate/1')
      })

    it.only('it submits single transaction', () =>{

      cy.get('#en__field_supporter_emailAddress').clear().type(donationSingle)
      cy.get('button').click()
      cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
      cy.get('.en__field__item--other > .en__field__input').type('100.99')
  context('Actions', () => {
        cy.getWithinIframe('[name="iban"]').type('NL39RABO0300065264')
  
})
      cy.get('button').click()
      cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'BANK_SINGLE')
      thankyouPage()
    })

    it('it submits recurring transaction', () =>{

      cy.get('#en__field_supporter_emailAddress').clear().type(donationRecur)
      cy.get('#en__field_transaction_recurrpay0').check()
      cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
      cy.get('#en__field_transaction_recurrfreq').type('DAILY')
      cy.get('button').click()
      cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
      cy.get('.en__field__item--other > .en__field__input').type('100.99')
  context('Actions', () => {
        cy.getWithinIframe('[name="iban"]').type('GB82WEST12345698765432')
  
})
      cy.get('button').click()
      cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'BANK_RECURRING')
      thankyouPage()
    })

    function thankyouPage() {
      cy.location('pathname').should('include', 'page/13346/donate/3')
      cy.get('.en__component--column > .en__component').as('thankYouPage')
      cy.get('@thankYouPage').contains( '9186')
      cy.get('@thankYouPage').contains( 'EUR')
      cy.get('@thankYouPage').contains( 'Stripe Gateway')
      cy.get('@thankYouPage').contains( '€100.99')
      cy.get('@thankYouPage').contains( 'TEST: sepa_debit')
    }
})

describe('test partial refund for single and recurring transactions', ()=>{

  const todaysDate = Cypress.moment().format('YYYY_MM_DD')
  const donationSingle = ('en_stripe_sepa_single_donation_' + todaysDate + '@engagingnetworks.online')
    const donationRecur = ('en_stripe_sepa_recur_donation_' + todaysDate + '@engagingnetworks.online')
  const donationTypeSingle = ('.gadget__singleDonations__donation__header')
  const donationTypeRecur = ('.gadget__recurringDonations__recurring__type')
  
    
  it('searches for the single donation transaction and completes partial refund', () => {
   
    logIn()
    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationSingle)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fbs')
  })

 cy.get(donationTypeSingle).eq(0).click()
 cy.get('.receiptOriginal').should('be.visible')
 cy.get('.receiptReplacement').should('be.visible')
 cy.get('.tax').should('be.visible')
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('have', 'Amount Charged: 100.99 EUR')
 cy.get('#refund__amount').type('85.99')
 cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
 cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
 cy.get('.gadget__receipt__buttons__send').click()
 cy.get('.message__actions__confirm').click()
 cy.wait(5000)
 cy.reload()
 cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
 cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
 cy.get('@refund').should('include', '-85.99 EUR')
 cy.get(donationTypeSingle).eq(1).click()
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('have', 'Amount Charged: 15 EUR')
 cy.get('.dashboard__action--close').click()
})

it('searches for the recurring donation transaction and completes partial refund', () => {

  logIn()
    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationRecur)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fbr')
  })
 cy.get(donationTypeRecur).eq(0).click()
 cy.get('.gadget__recurringDetail__history__item').eq(0).click()
 cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
 cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 EUR')
 cy.get('#refund__amount').type('20.99')
 cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt')
 .should('have.value', '604' )
 cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
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
  cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99EUR')
  logOut()

})
  
function logIn(){
 
  cy.visit(Cypress.env('testLogIn')+'#login')
  if(cy.location('pathname').should('have', '#login')){
   cy.get('#enLoginUsername').type(Cypress.env('testLogin'))
   cy.get('#enLoginPassword').type(Cypress.env('testUserPassword'))
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

})