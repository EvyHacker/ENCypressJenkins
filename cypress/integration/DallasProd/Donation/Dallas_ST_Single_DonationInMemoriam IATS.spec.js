/// <reference types="Cypress" />


describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('single_donation_memoriam_' + todaysDate + '@engagingnetworks.online')

  beforeEach(() => {
    cy.visit(Cypress.env('dallas')+'page/13509/donate/1')
  })

    it('has correct data', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Single Donation')
        cy.get('#en__field_supporter_emailAddress')
        .should('have.value', 'singledonationmemoriam@engagingnetworks.online')
        cy.get('#en__field_supporter_emailAddress').clear()
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_postcode').should('have.value', '06888')
        cy.get('#en__field_supporter_country').should('have.value', 'US')
        cy.get('#en__field_transaction_inmem0').should('be.checked')
        cy.get('#en__field_transaction_infname').should('have.value', 'ST Inform Name')
        cy.get('#en__field_transaction_infemail').should('have.value', "st_informemail@engagingnetworks.online")
        cy.get('#en__field_transaction_infadd1').should('have.value', 'ST_address 1')
        cy.get('#en__field_transaction_infadd2').should('have.value', 'ST_address 2')
        cy.get('#en__field_transaction_infcity').should('have.value', 'ST_city')
        cy.get('#en__field_transaction_infcountry').should('have.value', 'ST_country')
        cy.get('#en__field_transaction_infpostcd').should('have.value', 'ST_12345')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222220')
        cy.get('#en__field_transaction_ccvv').should('have.value', '111')
      })

    it('it submits single donation', () =>{
        
      cy.get('#en__field_supporter_emailAddress').clear()
      cy.get('#en__field_supporter_emailAddress').type(email)
      cy.get('#en__field_transaction_ccexpire').type('01')
      cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2022')
      cy.get('#en__field_transaction_donationAmt2').click()
      cy.get('button').click()
      cy.location('pathname').should('eq', '/page/13509/donate/2')
      cy.get('.en__component--column > .en__component > :nth-child(5)').contains( 'ST')
      cy.get('.en__component--column > .en__component > :nth-child(6)').contains('Single Donation')
      cy.get('.en__component--column > .en__component > :nth-child(7)').contains('address1')
      cy.get('.en__component > :nth-child(8)').contains('Tribeca')
      cy.get('.en__component > :nth-child(9)').contains('NY')
      cy.get('.en__component > :nth-child(10)').contains(email)
      cy.get('.en__component > :nth-child(11)').contains('06888')
      cy.get('.en__component > :nth-child(12)').contains('US')
      cy.get('.en__component > :nth-child(13)').contains('Smoke Test CC Name')
      cy.get('.en__component > :nth-child(15)').contains('39743')
      cy.get('.en__component > :nth-child(17)').contains('CREDIT_SINGLE')
      cy.get(':nth-child(18)').contains('USD')
      cy.get(':nth-child(20)').contains('IATS North America')
      cy.get(':nth-child(21)').contains('VISA')
      cy.get(':nth-child(24)').contains('$10.00')
      cy.get(':nth-child(28)').contains("st_informemail@engagingnetworks.online")
      cy.get(':nth-child(29)').contains('ST_address 1')
      cy.get(':nth-child(30)').contains('ST_address 2')
      cy.get(':nth-child(31)').contains('ST_city')
      cy.get(':nth-child(32)').contains('ST_country')
      cy.get(':nth-child(33)').contains('ST_12345')
    
      })

})
describe('test us.e-activist LogIn ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('single_donation_memoriam_' + todaysDate + '@engagingnetworks.online')

    it('searches for the supporters donation transaction', () => {

        logIn()

        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()

        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('fim')
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