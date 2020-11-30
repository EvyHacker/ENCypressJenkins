/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_emailsubscribedallas_' + todaysDate + '@tellamazingstories.com')
    
    beforeEach(() => {
        cy.visit(Cypress.env('dallas')+'page/15242/subscriptions/1')
      })
    it('can sign up for plant trees', () => {

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_questions_1661493').click()
        cy.get('#en__field_supporter_questions_165378').type('Email subscription test')
        cy.get('.en__captcha').click()
        //cy.get('button').click()
    })
})