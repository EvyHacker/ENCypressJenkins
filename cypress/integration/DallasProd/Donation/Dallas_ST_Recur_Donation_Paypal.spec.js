/// <reference types="Cypress" />
describe('test Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_recurdonation_channel' + todaysDate + '@engagingnetworks.online')

  beforeEach(() => {
    cy.visit(Cypress.env('dallas')+'page/13387/donate/1?ea.tracking.id=en_email&utm_content=ST_Recurring%20Donation_ORIG%20-%20Dallas%20Paypal&utm_campaign=TestMe&utm_medium=email&utm_source=engagingnetworks')
  })

    it('has correct data', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Recur Donation')
        cy.get('#en__field_supporter_emailAddress')
        .should('have.value', 'st_recurdonation@engagingnetworks.online')
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_postcode').should('have.value', '06888')
        cy.get('#en__field_supporter_country').should('have.value', 'US')
        cy.get('#en__field_transaction_paycurrency').should('have.value', 'USD')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222')
        cy.get('#en__field_transaction_ccvv').should('have.value', '111')
        cy.get('#en__field_transaction_recurrfreq').should('have.value', 'MONTHLY')
 })

    it('validates recurring check box', () => {

        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input')
          .type('2022')
        cy.get('#en__field_transaction_recurrpay').click()
        cy.get('button').click()
        cy.get('.en__field__error').invoke('text').should('eq', 'Recurring Payment Mandatory Field Empty')
          })
    
    it('it submits recurring donation', () =>{
       
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2022')
        cy.get('#en__field_transaction_donationAmt2').click()
        cy.get('button').click()
        cy.location('pathname').should('eq', '/page/13387/donate/2')
        cy.get('.en__component--column > .en__component > :nth-child(5)').contains('ST')
        cy.get('.en__component--column > .en__component > :nth-child(6)').contains('Recur Donation')
        cy.get('.en__component--column > .en__component > :nth-child(7)').contains('address1')
        cy.get('.en__component > :nth-child(8)').contains('Tribeca')
        cy.get('.en__component > :nth-child(9)').contains('NY')
        cy.get('.en__component > :nth-child(10)').contains(email)
        cy.get('.en__component > :nth-child(11)').contains('06888')
        cy.get('.en__component > :nth-child(12)').contains('US')
        cy.get('.en__component > :nth-child(13)').contains('Smoke Test CC Name')
            //cy.get('.en__component > :nth-child(14)').contains('3960093')
        cy.get('.en__component > :nth-child(15)').contains('39340')
        cy.get('.en__component > :nth-child(16)').invoke('text').as('myNumber')
        cy.get('.en__component > :nth-child(17)').contains('CREDIT_RECURRING')
            //cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')
        cy.get(':nth-child(18)').contains('USD')
        cy.get(':nth-child(20)').contains('PayPal Gateway')
        cy.get(':nth-child(21)').contains('Visa')
            //cy.get(':nth-child(22)'),should('have','012022')
        cy.get(':nth-child(24)').contains('$10.00')
        cy.get(':nth-child(26)').contains('MONTHLY')
          })
     })

describe('test us.e-activist LogIn ', ()=>{

  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_recurdonation_channel' + todaysDate + '@engagingnetworks.online')
  
    it('searches for the supporters donation transaction', () => {
   
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('fcr')
      })
        logOut()
   })

   function logIn(){
    cy.visit(Cypress.env('dallasLogIn')+'#login')

     cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
     cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
     cy.get('.button').click()
   
  }
  function logOut(){

    cy.get('.dashboard__action--close').click()
    cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
    cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
    cy.url().should('contain','#login')
  }
})