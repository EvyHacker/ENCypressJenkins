/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const emailSingle = ('st_events_singleticket_' + todaysDate + '@tellamazingstories.com')
  const emailGroup = ('st_events_groupticket_' + todaysDate + '@tellamazingstories.com')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/50007/event/1')
  })

  it('can purchase single ticket', () => {

    //validate if the user can add more than  1 ticket
    cy.get(':nth-child(1) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get('.en__ticketSummary__checkout').click()

    AddSingleTicket()

    cy.get('.en__orderSummary__item > .en__orderSummary__data--type').should('have.text', 'Front Row')
    cy.get('.en__orderSummary__data--quantity').should('have.text', '1')
    cy.get('.en__orderSummary__item > .en__orderSummary__data--cost').should('have.text', '10.00 USD')
    cy.get('.en__orderSummary__data--totalAmount').should('have.text', '10.00 USD')
    cy.get('#en__field_supporter_emailAddress').type(emailSingle)
    AddCC()

    ValidateThankYouPage()
    cy.get('.en__component > :nth-child(10)').contains(emailSingle)
    cy.get(':nth-child(24)').contains('$10.00')

})

it('can purchase group tickets', () => {

    cy.get(':nth-child(2) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get('.en__ticketSummary__checkout').click()

    cy.get('.en__orderSummary__item > .en__orderSummary__data--type').should('have.text', 'Group Ticket')
    cy.get('.en__orderSummary__data--quantity').should('have.text', '1')
    cy.get('.en__orderSummary__data--totalAmount').should('have.text', '50.00 USD')
    cy.get('#en__field_supporter_emailAddress').type(emailGroup)
    AddGroupTicket()

    AddCC()

    ValidateThankYouPage()
    cy.get('.en__component > :nth-child(10)').contains(emailGroup)
    cy.get(':nth-child(24)').contains('$50.00')

})

it('can add additional donation amount', () => {

    cy.get(':nth-child(1) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get(':nth-child(2) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get('.en__additional__input').type('25.00')
    cy.get('.en__ticketSummary__checkout').click()
    cy.get('.en__orderSummary__data--totalAmount').should('have.text', '85.00 USD')
    cy.get('#en__field_supporter_emailAddress').type(emailGroup)
    AddSingleTicket()
    AddGroupTicket()
    
    AddCC()
    ValidateThankYouPage()

    cy.get('.en__component > :nth-child(10)').contains(emailGroup)
    cy.get(':nth-child(24)').contains('$85.00')

})

it('can add promo code per single ticket', () => {

    cy.get(':nth-child(1) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get(':nth-child(2) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get('.en__additional__code').type('DISC10')
    cy.get('.en__ticketSummary__checkout').click()

    cy.get('.en__orderSummary').invoke('text').as('summary')
    cy.get('@summary').should('include', 'Front Row')
    cy.get('@summary').should('include', 'Group Ticket')
    cy.get('@summary').should('include', 'DISC10')
    cy.get('@summary').should('include', '9.00 USD')
    cy.get('@summary').should('include', '50.00 USD')
    cy.get('@summary').should('include', '0.00 USD')
   
    cy.get('.en__orderSummary__data--totalAmount').should('have.text', '59.00 USD')
    cy.get('#en__field_supporter_emailAddress').type(emailGroup)
    AddSingleTicket()
    AddGroupTicket()
    
    AddCC()
    ValidateThankYouPage()

    cy.get('.en__component > :nth-child(10)').contains(emailGroup)
    cy.get(':nth-child(24)').contains('$59.00')

})

it('can add promo code per order total', () => {

    cy.get(':nth-child(1) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get(':nth-child(2) > .en__ticket__field--quantity > .en__ticket__selector > .en__ticket__plus').click()
    cy.get('.en__additional__input').type('55.00')
    cy.get('.en__additional__code').type('10TOTAL')
    cy.get('.en__ticketSummary__checkout').click()

    cy.get('.en__orderSummary').invoke('text').as('summary')
    cy.get('@summary').should('include', 'Front Row')
    cy.get('@summary').should('include', 'Group Ticket')
    cy.get('@summary').should('include', '10TOTAL')
    cy.get('@summary').should('include', '9.00 USD')
    cy.get('@summary').should('include', '45.00 USD')
    cy.get('@summary').should('include', '55.00 USD')

    cy.get('.en__orderSummary__data--totalAmount').should('have.text', '109.00 USD')
    cy.get('#en__field_supporter_emailAddress').type(emailGroup)
    AddSingleTicket()

    AddGroupTicket()
    
    AddCC()
    ValidateThankYouPage()

    cy.get('.en__component > :nth-child(10)').contains(emailGroup)
    cy.get(':nth-child(24)').contains('$109.00')

})

it('can not proceed with no tickets selected', () =>{

    cy.get('.en__ticketSummary__checkout').click()
    cy.get('.en__error').should('have.text', 'Please be sure to select tickets, for your order.')
    
})

function AddSingleTicket(){

    cy.location('pathname').should('include', '/page/50007/event/2')
    //Attendee 1
    cy.get('#en__field_event_ticketType_0_tickets_0_registrants_0_firstName').type('Test')
    cy.get('#en__field_event_ticketType_0_tickets_0_registrants_0_lastName').type('Single Ticket')
    cy.get('#en__field_event_ticketType_0_tickets_0_registrants_0_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_0_tickets_0_registrants_0_dietaryPreference').type('No dairy')
    cy.get('#en__field_event_ticketType_0_tickets_0_registrants_0_mobilityRequirement').type('No text messages')
}

function AddGroupTicket(){

    cy.location('pathname').should('include', '/page/50007/event/2')
    //Attendee 1
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_0_firstName').type('Test')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_0_lastName').type('Group Ticket')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_0_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_0_dietaryPreference').type('No dairy')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_0_mobilityRequirement').type('No text messages')
    //Attendee 2
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_1_firstName').type('Test1')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_1_lastName').type('Group Ticket1')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_1_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_1_dietaryPreference').type('No soy')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_1_mobilityRequirement').type('No phone calls')
    //Attendee 3
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_2_firstName').type('Test2')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_2_lastName').type('Group Ticket2')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_2_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_2_dietaryPreference').type('N/A')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_2_mobilityRequirement').type('N/A')
    //Attendee 4
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_3_firstName').type('Test3')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_3_lastName').type('Group Ticket3')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_3_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_3_dietaryPreference').type('N/A')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_3_mobilityRequirement').type('N/A')
    //Attendee 5
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_4_firstName').type('Test4')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_4_lastName').type('Group Ticket4')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_4_emailAddress').type('st_eventstoronto@tellamazingstories.com')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_4_dietaryPreference').type('N/A')
    cy.get('#en__field_event_ticketType_1_tickets_0_registrants_4_mobilityRequirement').type('N/A')
}

function AddCC(){

    cy.get('#en__field_supporter_firstName').type('Evy')
    cy.get('#en__field_supporter_lastName').type('Test')
    cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
    cy.get('#en__field_supporter_city').type('Washington')
    cy.get('#en__field_supporter_region').select('DC')
    cy.get('#en__field_supporter_country').select('USA')
    cy.get('#en__field_supporter_postcode').type('20001')
    cy.get('#en__field_transaction_paymenttype').select('Visa')
    cy.get('#en__field_supporter_creditCardHolderName').type('Evy')
    cy.get('#en__field_transaction_ccnumber').type('4222222222222220')
    cy.get('#en__field_transaction_ccexpire').type('01')
    cy.get('.en__field__element > :nth-child(3) > .en__field__input').type('2023')
    cy.get('#en__field_transaction_ccvv').type('123')
    cy.get('button').click()

}

function ValidateThankYouPage(){

    cy.location('pathname').should('include', '/page/50007/event/3')
    cy.get('.en__component--column > .en__component').as('thankcopy')
    cy.get('@thankcopy').contains('Evy')
    cy.get('@thankcopy').contains('Test')
    cy.get('@thankcopy').contains('1146 19th Street NW, Suite 800')
    cy.get('@thankcopy').contains('Washington')
    cy.get('@thankcopy').contains('DC')
    cy.get('@thankcopy').contains('20001')
    cy.get('@thankcopy').contains('US')
    cy.get('@thankcopy').contains('Evy')
    cy.get('@thankcopy').contains('160562')
    cy.get('@thankcopy').contains('CREDIT_SINGLE')
    cy.get('@thankcopy').contains('USD')
    cy.get('@thankcopy').contains('IATS North America')
    cy.get('@thankcopy').contains('VISA')

}
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailSingle = ('st_events_singleticket_' + todaysDate + '@tellamazingstories.com')
    const emailGroup = ('st_events_groupticket_' + todaysDate + '@tellamazingstories.com')
      
    it('searches for the single ticket transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(emailSingle)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('ecs')
      })
      logOut()
    })

    it('searches for the group ticket transaction', () => {
   
      logIn()
      cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(emailGroup)
      cy.get('.userInput__action > .button').click()
      cy.get('.icon--search--color').click()
      cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
        expect(text.trim()).contains('ecs')
    })
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