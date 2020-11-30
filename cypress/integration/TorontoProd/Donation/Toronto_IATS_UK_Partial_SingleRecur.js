Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('test partial refund for IATS gateway for Single and Recurring transactions', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const tomorrowsDate = Cypress.moment().add(1, 'day').format('MM/DD/YYYY')
    const donationSingle = ('toronto_iats_uk_partial_single_donation_' + todaysDate + '@tellamazingstories.com')
    const donationRecur = ('toronto_iats_uk_partial_recur_donation_' + todaysDate + '@tellamazingstories.com')

    beforeEach(() => {
        cy.visit(Cypress.env('toronto')+'page/63671/donate/1')
      })

    it('can submit single donation', () =>{


        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__item--other > .en__field__input').type('100.99')
        cy.get('#en__field_supporter_emailAddress').clear().type(donationSingle)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2022')
        cy.get('button').click()

        cy.url().should('include', '/page/63671/donate/2')

        cy.get('.en__component--column > .en__component').as('thankYouPage')
        cy.get('@thankYouPage').contains( '186582')
        cy.get('@thankYouPage').contains( 'CREDIT_SINGLE')
        cy.get('@thankYouPage').contains( 'GBP')
        cy.get('@thankYouPage').contains( 'IATS United Kingdom')
        cy.get('@thankYouPage').contains( '£100.99')
        cy.get('@thankYouPage').contains( 'VISA')
  
    })

    it('can submit recurring donation', () =>{

        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__item--other > .en__field__input').type('111.99')
        cy.get('#en__field_supporter_emailAddress').clear().type(donationRecur)
        cy.get('#en__field_transaction_recurrpay0').check()
        cy.get('#en__field_transaction_recurrpay1').click()
        cy.get('#en__field_transaction_cardstart').type(tomorrowsDate)
        cy.get('#en__field_transaction_recurrfreq').type('DAILY')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2022')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/63671/donate/2')

        cy.get('.en__component--column > .en__component').as('thankYouPage')
        cy.get('@thankYouPage').contains( '186582')
        cy.get('@thankYouPage').contains( 'CREDIT_RECURRING')
        cy.get('@thankYouPage').contains( 'GBP')
        cy.get('@thankYouPage').contains( 'IATS United Kingdom')
        cy.get('@thankYouPage').contains( '£111.99')
        cy.get('@thankYouPage').contains( 'VISA')
  
    })
})

describe('test partial refund for single and recurring transactions', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const donationSingle = ('toronto_iats_uk_partial_single_donation_' + todaysDate + '@tellamazingstories.com')
    const donationRecur = ('toronto_iats_uk_partial_recur_donation_' + todaysDate + '@tellamazingstories.com')
    const donationTypeSingle = ('.gadget__singleDonations__donation__header')
    const donationTypeRecur = ('.gadget__recurringDonations__recurring__type')

    
      it('searches for the single ticket transaction and completes partial refund', () => {
     
          logIn()
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
       cy.get('.gadget__receipt > p').invoke('text').should('have', 'Amount Charged: 100.99 GBP')
       cy.get('#refund__amount').type('85.99')
       cy.get('label > input').check()
       cy.get('.gadget__receipt__field__input__receipt').select('Refund Template').should('have.value', '13148' )
       cy.get('.gadget__receipt__field__input__template').select('Default for Donation Refund (single and recurring)')
       .should('have.value', '1')
       cy.get('.gadget__receipt__buttons__send').click()
       cy.get('.message__actions__confirm').click()
       cy.wait(5000)
       cy.reload()
       cy.get(donationTypeSingle).eq(0).click().trigger('mouseover')
       cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
       cy.get('@refund').should('include', '-85.99 GBP')
       cy.get(donationTypeSingle).eq(1).click()
       cy.get('.refund').click()
       cy.get('.gadget__receipt > p').invoke('text').should('have', 'Amount Charged: 15 GBP')
       cy.get('.dashboard__action--close').click()
    })

    it('searches for the recurring ticket transaction and completes partial refund', () => {

        logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(donationRecur)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
          .then((text) => {
            expect(text.trim()).contains('fcr')
        })
       cy.get(donationTypeRecur).eq(0).click()
       cy.get('.gadget__recurringDetail__history__item').click()
       cy.get('.gadget__recurringDetail__history__buttons__refund > .button').click()
       cy.get('.gadget__receipt > p').invoke('text').should('include', 'Amount Charged: 111.99 GBP')
       cy.get('#refund__amount').type('20.99')
       cy.get('label > input').check()
       cy.get('.gadget__receipt__field__input__receipt').select('Refund Template')
       .should('have.value', '13148' )
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
        cy.get('.gadget__transactionHistory__transactionDetail').invoke('text').should('include', '-20.99GBP')
        logOut()

    })
        
    function logIn(){
        cy.visit(Cypress.env('torontoLogIn')+'#login')

          if(cy.location('pathname').should('have', '#login')){
             cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
             cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
             cy.get('.button').click()
             if(cy.location('pathname').should('have', '#login/tos')){
                cy.get('.enSandbox__tos__agree').click()
            }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})}
      }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})
        }
      }
      function logOut(){
  
          cy.get('.dashboard__action--close').click()
          cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
          cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
          cy.url().should('contain','#login')
      }
    })