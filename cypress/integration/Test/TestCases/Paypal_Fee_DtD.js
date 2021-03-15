
/// <reference types="Cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  
  })
  
  describe('test fee cover and DtD for Worldpay  gateway for 3D transaction', ()=>{
      const todaysDate = Cypress.moment().format('MM_DD_YYYY')
      const donationSingle = ('en_paypal_single_donation_' + todaysDate + '@engagingnetworks.online')
      var currentURL
  
      it.only('can submit single donation', () =>{
  
          cy.visit(Cypress.env('test')+'page/13860/donate/1')
          cy.get('#dd-input').type('Coke')
          cy.get('#dtd-selected-company-1').contains('The Jack Kent Cooke Foundation').click()
          cy.get('#en__field_transaction_feeCover').click()
          cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
          cy.get(':nth-child(2) > .en__field__item--other > .en__field__input').eq(0).type('100.99')
          
          cy.get('#en__field_supporter_emailAddress').clear().type(donationSingle)
          cy.get('#en__field_transaction_recurrpay1').check()
          cy.get('#en__field_transaction_paymenttype').select('Paypal').should('have.value', 'Paypal')
          cy.get('button').click()
  
          cy.url().should('include', 'https://www.sandbox.paypal.com/')
          let currentURL
                 cy.url().then(url => {
                 currentURL = url
              })

            // cy.then(() => cy.visit(currentURL))
            // cy.get('#email').type(Cypress.env('PayPalUser'))
            // cy.get('#btnNext').click()
            // cy.get('#password').type(Cypress.env('PayPalPassword'))
            // cy.get('#btnLogin').click()
            // console.log(Cypress.config('experimentalSourceRewriting'))

          it('searches for the single ticket transaction and completes partial refund', () => {
    
            cy.visit(currentURL)
            cy.get('#email').type(Cypress.env('PayPalUser'))
            cy.get('#btnNext').click()
            cy.get('#password').type(Cypress.env('PayPalPassword'))
            cy.get('#btnLogin').click()
            
          })
  
        //   cy.location('pathname').should('include', '/page/13702/donate/2')
        //   cy.get('.mg-description > :nth-child(1) > strong').should('include.text', 'Castle & Cooke Hawaii')
        //   cy.get('.en__component--column > .en__component').as('thankYouPage')
        //   cy.get('@thankYouPage').contains( '9576')
        //   cy.get('@thankYouPage').contains( 'CREDIT_SINGLE')
        //   cy.get('@thankYouPage').contains( 'USD')
        //   cy.get('@thankYouPage').contains( 'RBS Gateway')
        //   cy.get('@thankYouPage').contains( '$109.02')
        //   cy.get('@thankYouPage').contains( '$100.99')
        //   cy.get('@thankYouPage').contains( '$8.03')
        //   cy.get('@thankYouPage').contains( 'TEST: VISA-SSL')
    
      })
  
  })
  
  describe('test partial refund for single and recurring transactions', ()=>{
  
      const todaysDate = Cypress.moment().format('MM_DD_YYYY')
      const donationSingle = ('en_worldpay_single_donation_' + todaysDate + '@engagingnetworks.online')
      const donationTypeSingle = ('.gadget__singleDonations__donation__header')
      var currentURL
        
      it.only('searches for the single ticket transaction and completes partial refund', () => {
       
        cy.visit(currentURL)
        cy.get('#email').type(Cypress.env('PayPalUser'))
        cy.get('#btnNext').click()
        cy.get('#password').type(Cypress.env('PayPalPassword'))
        cy.get('#btnLogin').click()
        //logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(donationSingle)
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
     cy.get('.message__actions__confirm').click()
     cy.reload()
     cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
     cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
     cy.get('@refund').should('include', '109.02 USD')
    
  })
  
      
  function logIn(){
     
      cy.visit(Cypress.env('testLogIn')+'#login')
      
      cy.get('#enLoginUsername').type(Cypress.env('testLogin'))
      cy.get('#enLoginPassword').type(Cypress.env('testUserPassword'))
      cy.get('.button').click()
     
    }
  
  })