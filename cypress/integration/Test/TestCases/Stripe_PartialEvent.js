describe('test partial refund for Iats gateway for event tickets', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY_mm')
    const ticket = ('en_stripe_partial_events_' + todaysDate + '@tellamazingstories.com')
    const ticketDiscount = ('en_stripe_partial_event_discount_' + todaysDate + '@tellamazingstories.com')
    const event = ('.gadget__events__header')
    var newTicket
    var newTicketDiscount

    it('can purchase and validate tickets ', () =>{

      cy.visit(Cypress.env('test')+'page/13218/event/1?ea.tracking.id=ticket_dub&mode=DEMO')
        cy.get('.en__ticket__price').should((price) => {
            expect(price.eq(0)).to.include.text('10.99')
            expect(price.eq(1)).to.include.text('25.99')
            expect(price.eq(2)).to.include.text('100.99')
        })
        cy.get('.en__ticket__plus').eq(0).dblclick({ delay: 1000 })
        cy.get('.en__ticket__plus').eq(1).dblclick({ delay: 1000 })
        cy.get('.en__ticket__plus').eq(2).dblclick({ delay: 1000 })
        cy.get('.en__additional__input').type('155.50', { delay: 100 })
        cy.get('.en__ticketSummary__checkout').click({ delay: 2000 })
        cy.url().should('include', '/13218/event/2')
        cy.get('.en__orderSummary__data--totalAmount').should('have.text', '431.44 USD')
        cy.get('#en__field_supporter_emailAddress').clear().type(ticket)
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get(':nth-child(3) > .en__field__input').type('2022')
        cy.get('button').click()
        cy.url().should('include', '/13218/event/3')
        cy.get('.en__component--copyblock > :nth-child(4)').then(($usage) => {
          newTicket = $usage.text()
    })
  })

    it('can purchase and validate tickets with discount', () =>{

      cy.visit(Cypress.env('test')+'page/13218/event/1?https://politicalnetworks.com/page/13218/event/1?ea.tracking.id=%D0%B2%D0%B0%D0%BF%D0%BA%D0%BF%D1%84%D1%84%D1%8B%D0%B2%D0%B0!&utm_content=Stripe%20partial%20tickets%20refund&utm_campaign=stripe_event&utm_medium=referral&utm_source=blog&mode=DEMO')
        cy.get('.en__ticket__price').should((price) => {
            expect(price.eq(0)).to.include.text('10.99')
            expect(price.eq(1)).to.include.text('25.99')
            expect(price.eq(2)).to.include.text('100.99')
        })
        cy.get('.en__ticket__plus').eq(0).dblclick({ delay: 1000 })
        cy.get('.en__ticket__plus').eq(1).dblclick({ delay: 1000 })
        cy.get('.en__ticket__plus').eq(2).dblclick({ delay: 1000 })
        cy.get('.en__additional__input').type('155.50', { delay: 100 })
        cy.get('.en__additional__code').type('DISC10', { delay: 100 })
        cy.get('.en__ticketSummary__checkout').click({ delay: 2000 })
        cy.url().should('include', '/13218/event/2')
        cy.get('.en__orderSummary__data--totalAmount').should('have.text', '391.44 USD')
        cy.get('#en__field_supporter_emailAddress').clear().type(ticketDiscount)
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get(':nth-child(3) > .en__field__input').type('2022')
        cy.get('button').click()
        cy.url().should('include', '/13218/event/3')
        cy.get('.en__component--copyblock > :nth-child(4)').then(($usage) => {
          newTicketDiscount = $usage.text()
    })
  })
    
    it('refunds only tickets', () => {
     
      logIn()
      cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(newTicket)
      cy.get('.userInput__action > .button').click()
      cy.wait(4000)
      cy.get('.icon--search--color').should('be.visible').click()
      cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
      .then((text) => {
        expect(text.trim()).contains('ecs')
    })

    cy.get(event).click()
    
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 431.44 USD')
    cy.get('.gadget__events__table').find('tr').within(() => {
        cy.get('td').eq(0).find('input').should('have.value', '4160').check()
        cy.get('td').eq(1).should('have.text', 'Ticket')
        cy.get('td').eq(3).should('have.text', '10.99 USD')
        cy.get('td').eq(5).should('have.text', 'Ticket')
        cy.get('td').eq(7).should('have.text', '10.99 USD')
        cy.get('td').eq(8).find('input').should('have.value', '4161').check()
        cy.get('td').eq(9).should('have.text', 'VIP')
        cy.get('td').eq(11).should('have.text', '25.99 USD')
        cy.get('td').eq(13).should('have.text', 'VIP')
        cy.get('td').eq(15).should('have.text', '25.99 USD')
        cy.get('td').eq(16).find('input').should('have.value', '4162').check()
        cy.get('td').eq(17).should('have.text', 'Group')
        cy.get('td').eq(23).should('have.text', '100.99 USD')
        cy.get('td').eq(25).should('have.text', 'Group')
        cy.get('td').eq(31).should('have.text', '100.99 USD')
        cy.get('td').eq(35).should('include.text', '155.5 USD')

    })
    cy.get('.refund__amount').should('have.text', '137.97')
    cy.get('label > input').check()
    cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
    cy.get('.gadget__receipt__field__input__template').select('Default for Event Ticket Refund').should('have.value', '3')
    cy.get('.gadget__receipt__buttons__send').click()
    cy.get('.message__actions__confirm').click()
    cy.wait(5000)
    cy.reload()
    cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text')
      .then((text) => {
        expect(text.trim()).contains('rfd')
    })
    cy.reload()
    cy.get(event).eq(0).click().trigger('mouseover')
    cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
    cy.get('@refund').should('include', '-137.97 USD')
    cy.get(event).eq(1).click()
    cy.get('.gadget__attachment__view').should('be.visible')
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 293.47 USD')
    cy.get('.gadget__events__table').find('tr').within(() => {
        cy.get('td').eq(0).find('input').should('be.disabled')
        cy.get('td').eq(8).find('input').should('be.disabled')
        cy.get('td').eq(16).find('input').should('be.disabled')
  
})
    })

it('refunds only partial additional amount', () => {
 
  logIn()
    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(newTicket)
    cy.get('.userInput__action > .button').should('be.visible').click()
    cy.get('.icon--search--color').click()
      
    cy.get(event).eq(1).click()
    cy.get('.gadget__attachment__view').should('be.visible')
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 293.47 USD')
    cy.get('.refund__additional').should('have.value', 'additional').check()
    cy.get('.refund__additional__input').should('have.value', '155.5').clear().type('19.99')
    cy.get('td > .gadget__receipt__field').should('contain.text', '19.99')
    cy.get('label > input').check()
    cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
    cy.get('.gadget__receipt__field__input__template').select('Default for Event Ticket Refund').should('have.value', '3')
    cy.get('.gadget__receipt__buttons__send').click()
    cy.get('.message__actions__confirm').click()
    cy.wait(5000)
    cy.reload()
    cy.get(event).eq(0).click().trigger('mouseover')
    cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
    cy.get('@refund').should('include', '-19.99 USD')
    cy.get(event).eq(2).click()
    cy.get('.gadget__attachment__view').should('be.visible')
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 273.48 USD')

})

it('refunds partial additional amount and all tickets', () => {
 
  logIn()
    cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(newTicket)
    cy.get('.userInput__action > .button').click()
    cy.wait(4000)
    cy.get('.icon--search--color').should('be.visible').click()
      
    cy.get(event).eq(2).click()
    cy.get('.gadget__attachment__view').should('be.visible')
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 273.48 USD')
    cy.get('.gadget__events__table').find('tr').within(() => {
        cy.get('td').eq(4).find('input').check()
        cy.get('td').eq(12).find('input').check()
        cy.get('td').eq(24).find('input').check()
        cy.get('td').eq(39).should('include.text', '19.99 USD')    
  
})
    cy.get('.refund__additional').should('have.value', 'additional').check()
    cy.get('.refund__additional__input').should('have.value', '135.51')
    cy.get('td > .gadget__receipt__field').should('contain.text', '273.48')
    cy.get('label > input').check()
    cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
    cy.get('.gadget__receipt__field__input__template').select('Default for Event Ticket Refund').should('have.value', '3')
    cy.get('.gadget__receipt__buttons__send').click()
    cy.get('.message__actions__confirm').click()
    cy.wait(5000)
    cy.reload()
    cy.get(event).eq(0).click().trigger('mouseover')
    cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
    cy.get('@refund').should('include', '-273.48 USD')


})

it('refunds tickets with discount code', () => {

  logIn()
  cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
      .type(newTicketDiscount)
    cy.get('.userInput__action > .button').should('be.visible').click()
    cy.get('.icon--search--color').click()
    cy.get(event).click()
    cy.get('.gadget__attachment__view').should('be.visible')
    cy.get('.gadget__attachment__resend').should('be.visible')
    cy.get('.gadget__attachment__refund').click()
    cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 391.44 USD')
    cy.get('.gadget__events__table').find('tr').within(() => {
      cy.get('td').eq(0).should('have.text', 'Ticket')
      cy.get('td').eq(2).should('have.text', '10.99 USD')
      cy.get('td').eq(3).should('have.text', 'Ticket')
      cy.get('td').eq(5).should('have.text', '10.99 USD')
      cy.get('td').eq(6).should('have.text', 'VIP')
      cy.get('td').eq(8).should('have.text', '15.99 USD')
      cy.get('td').eq(9).should('have.text', 'VIP')
      cy.get('td').eq(11).should('have.text', '15.99 USD')
      cy.get('td').eq(12).should('have.text', 'Group')
      cy.get('td').eq(18).should('have.text', '90.99 USD')
      cy.get('td').eq(19).should('have.text', 'Group')
      cy.get('td').eq(25).should('have.text', '90.99 USD')
      cy.get('td').eq(28).should('include.text', '155.5 USD')

  })

  cy.get('label > input').check()
  cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
  cy.get('.gadget__receipt__field__input__template').select('Default for Event Ticket Refund').should('have.value', '3')
  cy.get('.gadget__receipt__buttons__send').click()
  cy.get('.message__actions__confirm').click()
  cy.wait(5000)
  cy.reload()
  cy.get(event).eq(0).click().trigger('mouseover')
  cy.get('.gadget__singleDonations__transaction').invoke('text').as('refund')   
  cy.get('@refund').should('include', '-391.44 USD')
  cy.get(event).eq(1).click()
  cy.get('.gadget__attachment__view').should('be.visible')
  cy.get('.gadget__attachment__resend').should('be.visible')
  cy.get('.gadget__attachment__refund').click()
  cy.get('.gadget__receipt > p').invoke('text').should('contain', 'Amount Charged: 0 USD')
  cy.get('td > .gadget__receipt__field').should('contain.text', '391.44 USD')
  cy.get('.gadget__receipt__buttons__send').should('not.be.visible')
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