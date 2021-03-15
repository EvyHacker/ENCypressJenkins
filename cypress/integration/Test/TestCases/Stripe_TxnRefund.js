/// <reference types="Cypress" />
///<reference types="cypress-iframe" />
import 'cypress-iframe'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false


})

describe('test partial refund for Stripe gateway 3D and none 3D transactions', () => {
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const tomorrowsDate = Cypress.moment().add(1, 'day').format('MM/DD/YYYY')
  const donationSingleSepa = ('en_stripe_sepa_single_sepa_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurSepa = ('en_stripe_sepa_recur_sepa_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3220 = ('en_stripe_partial_single_cc3220_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3220 = ('en_stripe_partial_recur_cc3220_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3063 = ('en_stripe_partial_single_cc3063_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3063 = ('en_stripe_partial_recur_cc3063_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC1629 = ('en_stripe_partial_single_cc1629_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3155 = ('en_stripe_partial_single_cc3155_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3155 = ('en_stripe_partial_recur_cc3155_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC4242 = ('en_stripe_partial_single_cc4242_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC4242 = ('en_stripe_partial_recur_cc4242_donation_' + todaysDate + '@engagingnetworks.online')


  beforeEach(() => {
    cy.visit(Cypress.env('test') + 'page/13415/donate/1')
  })

  it('it submits single sepa_debit transaction', () =>{

    cy.visit(Cypress.env('test') + 'page/13346/donate/1')
    cy.get('#en__field_supporter_emailAddress').clear().type(donationSingleSepa)
    cy.get('button').click()
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    context('Actions', () => {
      cy.getWithinIframe('[name="iban"]').type('NL39RABO0300065264')
})
    cy.get('button').click()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'BANK_SINGLE')
    thankyouPageSepa()
  })

  it('it submits recurring sepa_debit transaction', () =>{

    cy.visit(Cypress.env('test') + 'page/13346/donate/1')
    cy.get('#en__field_supporter_emailAddress').clear().type(donationRecurSepa)
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
    thankyouPageSepa()
  })

  it('it submits single 3D transaction 4000000000003220', () => {

    cy.get('#en__field_supporter_emailAddress').type(donationSingleCC3220)
    cy.get('button').click()
    cy.url().should('eq', 'https://politicalnetworks.com/page/13415/donate/2')
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000000000003220')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3dIframe().find("[id*=test-source-fail]").click()
    cy.location('pathname').should('include', 'page/13415/donate/2')
    cy.get('.en__error').should('have.text', 'We are unable to authenticate your payment method. Please choose a different payment method and try again.')
    
    cy.get('button').click()
    cy.wait(5000)
    cy.failForStripe3dIframe().find("[id*=test-source-authorize]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_SINGLE')

  })

  it('it submits recurring 3D transaction 4000000000003220', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(donationRecurCC3220)
    cy.get('#en__field_transaction_recurrpay0').check()
    cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
    cy.get('#en__field_transaction_recurrfreq').type('DAILY')
    cy.get('button').click()
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000000000003220')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3dIframe().find("[id*=test-source-authorize]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_RECURRING')

  })

  it('it submits single 3D transaction 4000000000003063', () => {

    cy.get('#en__field_supporter_emailAddress').type(donationSingleCC3063)
    cy.get('button').click()
    cy.url().should('eq', 'https://politicalnetworks.com/page/13415/donate/2')
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000000000003063')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3DIframe().find("[id*=test-source-fail]").click()
    cy.location('pathname').should('include', 'page/13415/donate/2')
    cy.get('.en__error').should('have.text', 'We are unable to authenticate your payment method. Please choose a different payment method and try again.')
    cy.get('button').click()
    cy.wait(5000)
    cy.failForStripe3DIframe().find("[id*=test-source-authorize]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_SINGLE')

  })

  it('it submits recurring 3D transaction 4000000000003063', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(donationRecurCC3063)
    cy.get('#en__field_transaction_recurrpay0').check()
    cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
    cy.get('#en__field_transaction_recurrfreq').type('DAILY')
    cy.get('button').click()
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000000000003063')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3DIframe().find("[id*=test-source-authorize-3ds]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_RECURRING')

  })

  it('it submits single 3D card_decline transaction 4000008400001629', () => {

    cy.get('#en__field_supporter_emailAddress').type(donationSingleCC1629)
    cy.get('button').click()
    cy.url().should('eq', 'https://politicalnetworks.com/page/13415/donate/2')
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000008400001629')
    cy.get('button').click()
    // cy.wait(5000)
    // cy.waitForStripe3DIframe().find("[id*=test-source-authorize-3ds]").click()
    cy.get('.en__error').should('contains.text', 'Your card was declined.')

  })

  it('it submits single 3D transaction 4000002500003155', () => {

    cy.get('#en__field_supporter_emailAddress').type(donationSingleCC3155)
    cy.get('button').click()
    cy.url().should('eq', 'https://politicalnetworks.com/page/13415/donate/2')
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000002500003155')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3DIframe().find("[id*=test-source-fail]").click()
    cy.location('pathname').should('include', 'page/13415/donate/2')
    cy.get('.en__error').should('have.text', 'We are unable to authenticate your payment method. Please choose a different payment method and try again.')
    cy.get('button').click()
    cy.wait(5000)
    cy.failForStripe3DIframe().find("[id*=test-source-authorize]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_SINGLE')

  })

  it('it submits recurring 3D transaction 4000002500003155', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(donationRecurCC3155)
    cy.get('#en__field_transaction_recurrpay0').check()
    cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
    cy.get('#en__field_transaction_recurrfreq').type('DAILY')
    cy.get('button').click()
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4000002500003155')
    cy.get('button').click()
    cy.wait(5000)
    cy.waitForStripe3DIframe().find("[id*=test-source-authorize-3ds]").click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_RECURRING')

  })

  it('it submits single transaction 4242424242424242', () => {

    cy.get('#en__field_supporter_emailAddress').type(donationSingleCC4242)
    cy.get('button').click()
    cy.url().should('eq', 'https://politicalnetworks.com/page/13415/donate/2')
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4242424242424242')
    cy.get('button').click()

    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_SINGLE')

  })

  it('it submits recurring 3D transaction 4242424242424242', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(donationRecurCC4242)
    cy.get('#en__field_transaction_recurrpay0').check()
    cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
    cy.get('#en__field_transaction_recurrfreq').type('DAILY')
    cy.get('button').click()
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('#en__field_transaction_ccnumber').type('4242424242424242')
    cy.get('button').click()
    thankyouPage()
    cy.get('.en__component--column > .en__component > :nth-child(5)').should('contain.text', 'CREDIT_RECURRING')

  })


  function thankyouPage() {
    cy.location('pathname').should('include', 'page/13415/donate/3')
    cy.get('.en__component--column > .en__component').as('thankYouPage')
    cy.get('@thankYouPage').contains('9271')
    cy.get('@thankYouPage').contains('USD')
    cy.get('@thankYouPage').contains('Stripe Gateway')
    cy.get('@thankYouPage').contains('$100.99')
    cy.get('@thankYouPage').contains('TEST: visa')
  }

  function thankyouPageSepa() {
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

  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const donationTypeSingle = ('.gadget__singleDonations__donation__header')
  const donationTypeRecur = ('.gadget__recurringDonations__recurring__type')
  const donationSingleSepa = ('en_stripe_sepa_single_sepa_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurSepa = ('en_stripe_sepa_recur_sepa_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3220 = ('en_stripe_partial_single_cc3220_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3220 = ('en_stripe_partial_recur_cc3220_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3063 = ('en_stripe_partial_single_cc3063_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3063 = ('en_stripe_partial_recur_cc3063_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC3155 = ('en_stripe_partial_single_cc3155_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC3155 = ('en_stripe_partial_recur_cc3155_donation_' + todaysDate + '@engagingnetworks.online')
  const donationSingleCC4242 = ('en_stripe_partial_single_cc4242_donation_' + todaysDate + '@engagingnetworks.online')
  const donationRecurCC4242 = ('en_stripe_partial_recur_cc4242_donation_' + todaysDate + '@engagingnetworks.online')


  beforeEach(() => {
    cy.visit(Cypress.env('testLogIn')+'#login')
    //if(cy.location('pathname').should('have', '#login')){
     cy.get('#enLoginUsername').type(Cypress.env('testLogin'))
     cy.get('#enLoginPassword').type(Cypress.env('testUserPassword'))
     cy.get('.button').click()
   // }
  })

  it('searches for the single donation sepa_debit transaction and completes partial refund', () => {
   
   
    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationSingleSepa)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fbs')
  })

 cy.get(donationTypeSingle).eq(1).click()
 cy.get('.receiptOriginal').should('be.visible')
 cy.get('.receiptReplacement').should('be.visible')
 cy.get('.tax').should('be.visible')
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 100.99 EUR')
 cy.get('#refund__amount').type('85.99')
 cy.get('label > input').check()
 cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
 cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
 cy.get('.gadget__receipt__buttons__send').click()
 cy.get('.message__actions__confirm').click()
 cy.wait(5000)
 cy.reload()
 cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
 cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
 cy.get('@refund').should('include', '-85.99 EUR')
 cy.get(donationTypeSingle).eq(2).click()
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 15 EUR')
 cy.get('.dashboard__action--close').click()
})

it('searches for the recurring donation sepa_debit transaction and completes partial refund', () => {


    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationRecurSepa)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fbr')
  })
 cy.get(donationTypeRecur).eq(0).click()
 cy.get('.gadget__recurringDetail__history__item').eq(1).click()
 cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
 cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 EUR')
 cy.get('#refund__amount').type('20.99')
 cy.get('label > input').check()
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
  cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 EUR')


})

  it('searches for the single transaction and completes partial refund 4000000000003220', () => {

    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationSingleCC3220)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fcs')
  })

 cy.get(donationTypeSingle).eq(1).click()
 cy.get('.receiptOriginal').should('be.visible')
 cy.get('.receiptReplacement').should('be.visible')
 cy.get('.tax').should('be.visible')
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('contains', 'Amount Charged: 100.99 USD')
 cy.get('#refund__amount').type('85.99')
 cy.get('label > input').check()
 cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
 cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
 cy.get('.gadget__receipt__buttons__send').click()
 cy.get('.message__actions__confirm').click()
 cy.wait(5000)
 cy.reload()
 cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
 cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
 cy.get('@refund').should('include', '-85.99 USD')
 cy.get(donationTypeSingle).eq(2).click()
 cy.get('.refund').click()
 cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 15 USD')
 cy.get('.dashboard__action--close').click()
})

it('searches for the recurring transaction and completes partial refund 4000000000003220', () => {

    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
    .type(donationRecurCC3220)
    cy.get('.userInput__action > .button').click()
    cy.get('.icon--search--color').click()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
    .then((text) => {
      expect(text.trim()).contains('fcr')
  })
 cy.get(donationTypeRecur).eq(0).click()
 cy.get('.gadget__recurringDetail__history__item').eq(1).click()
 cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
 cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 USD')
 cy.get('#refund__amount').type('20.99')
 cy.get('label > input').check()
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
  cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 USD')

})

it('searches for the single transaction and completes partial refund 4000000000003063', () => {

  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationSingleCC3063)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcs')
})

cy.get(donationTypeSingle).eq(1).click()
cy.get('.receiptOriginal').should('be.visible')
cy.get('.receiptReplacement').should('be.visible')
cy.get('.tax').should('be.visible')
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('contains', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('85.99')
cy.get('label > input').check()
cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
cy.get('.gadget__receipt__buttons__send').click()
cy.get('.message__actions__confirm').click()
cy.wait(5000)
cy.reload()
cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
cy.get('@refund').should('include', '-85.99 USD')
cy.get(donationTypeSingle).eq(2).click()
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 15 USD')
cy.get('.dashboard__action--close').click()
})

it('searches for the recurring transaction and completes partial refund 4000000000003063', () => {

  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationRecurCC3063)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcr')
})
cy.get(donationTypeRecur).eq(0).click()
cy.get('.gadget__recurringDetail__history__item').eq(1).click()
cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('20.99')
cy.get('label > input').check()
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
cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 USD')

})


it('searches for the single transaction and completes partial refund 4000002500003155', () => {

  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationSingleCC3155)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcs')
})

cy.get(donationTypeSingle).eq(1).click()
// cy.get('.receiptOriginal').should('be.visible')
// cy.get('.receiptReplacement').should('be.visible')
cy.get('.tax').should('be.visible')
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('85.99')
cy.get('label > input').check()
cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
cy.get('.gadget__receipt__buttons__send').click()
cy.get('.message__actions__confirm').click()
cy.wait(5000)
cy.reload()
cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
cy.get('@refund').should('include', '-85.99 USD')
cy.get(donationTypeSingle).eq(2).click()
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 15 USD')
cy.get('.dashboard__action--close').click()
})

it('searches for the recurring transaction and completes partial refund 4000002500003155', () => {

  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationRecurCC3155)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcr')
})
cy.get(donationTypeRecur).eq(0).click()
cy.get('.gadget__recurringDetail__history__item').eq(1).click()
cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('20.99')
cy.get('label > input').check()
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
cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 USD')


})

it('searches for the single transaction and completes partial refund 4242424242424242', () => {


  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationSingleCC4242)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcs')
})

cy.get(donationTypeSingle).eq(0).click()
cy.get('.receiptOriginal').should('be.visible')
cy.get('.receiptReplacement').should('be.visible')
cy.get('.tax').should('be.visible')
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('85.99')
cy.get('label > input').check()
cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
cy.get('.gadget__receipt__buttons__send').click()
cy.get('.message__actions__confirm').click()
cy.wait(5000)
cy.reload()
cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
cy.get('@refund').should('include', '-85.99 USD')
cy.get(donationTypeSingle).eq(1).click()
cy.get('.refund').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 15 USD')
cy.get('.dashboard__action--close').click()
})

it('searches for the recurring transaction and completes partial refund 4242424242424242', () => {

  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
  .type(donationRecurCC4242)
  cy.get('.userInput__action > .button').click()
  cy.get('.icon--search--color').click()
  cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
  .then((text) => {
    expect(text.trim()).contains('fcr')
})
cy.get(donationTypeRecur).eq(0).click()
cy.get('.gadget__recurringDetail__history__item').click()
cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 100.99 USD')
cy.get('#refund__amount').type('20.99')
cy.get('label > input').check()
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
cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99 USD')

})

// function logIn(){

//   cy.visit(Cypress.env('testLogIn')+'#login')
//   if(cy.location('pathname').should('have', '#login')){
//    cy.get('#enLoginUsername').type(Cypress.env('testLogin'))
//    cy.get('#enLoginPassword').type(Cypress.env('testUserPassword'))
//    cy.get('.button').click()
//   // } else{cy.visit(Cypress.env('dallasLogIn') + '#dashboard', {delay : 3000})
//   // }
// }
// function logOut(){

//   cy.get('.dashboard__action--close').click()
//   cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
//   cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
//   
// }

})