/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_petitiondallas_' + todaysDate + '@tellamazingstories.com')
    beforeEach(() => {
      cy.visit(Cypress.env('dallas')+'page/15187/action/1')
      })
      
    it('submits successfully petition', () => {
        
        cy.get('#en__field_supporter_questions_147162').click()
        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_transaction_comments').type('this is comment test')
        cy.get('button').click()

        validateThankYouPage()

    })

    function validateThankYouPage(){

        cy.location('pathname').should('include', '/page/15187/action/2')
        cy.get('.content').as('thankcopy')
        cy.get('@thankcopy').contains('Evy')
        cy.get('@thankcopy').contains('Test')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('GB')
    }
})
describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_petitiondallas_' + todaysDate + '@tellamazingstories.com')
    
      it('searches for the supporters ett transactions', () => {
     
          logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(email)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('qcb')
            expect(text.trim()).contains('pet')
        })
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
})