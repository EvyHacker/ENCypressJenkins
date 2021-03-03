/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_surveydallas_' + todaysDate + '@engagingnetworks.online')
    beforeEach(() => {
      cy.visit(Cypress.env('dallas')+'page/15188/survey/1')
      })

    it('submits successfully petition', () => {
        
        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_region').select('DC')
        cy.get('#en__field_supporter_postcode').type('20001')
        cy.get('button').click()

        validateCausePage()

        validateThankYouPage()

    })

    function validateCausePage(){

        cy.location('pathname').should('include', '/page/15188/survey/2')
        cy.get('#en__field_transaction_svblock_165379_svquestion_1653800').click()
        cy.get('#en__field_transaction_svblock_165379_svquestion_1653810').click()
        cy.get('#en__field_transaction_svblock_165379_svquestion_165382').type('Comment test')
        cy.get('button').click()

    }

    function validateThankYouPage(){

        cy.location('pathname').should('include', '/page/15188/survey/3')
        cy.get('.content').as('thankcopy')
        cy.get('@thankcopy').contains('Evy')
        cy.get('@thankcopy').contains('Test')
        cy.get('@thankcopy').contains('1146 19th Street NW, Suite 800')
        cy.get('@thankcopy').contains('Washington')
        cy.get('@thankcopy').contains('DC')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('20001')
        cy.get('@thankcopy').contains('GB')
    }
})
describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_surveydallas_' + todaysDate + '@engagingnetworks.online')
    
      it('searches for the supporters ett transactions', () => {
     
          logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(email)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('svy')
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