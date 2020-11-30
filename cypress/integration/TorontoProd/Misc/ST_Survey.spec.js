/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_survey_toronto_' + todaysDate + '@tellamazingstories.com')

    beforeEach(() => {
        cy.visit(Cypress.env('toronto')+'page/50003/survey/1')
      })

    it('submits successfully petition', () => {
        
        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Survey -Toronto')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_surveytoronto@tellamazingstories.com')
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_postcode').should('have.value', '111222')
        cy.get('button').click()

        validateCausePage()

        validateThankYouPage()

    })

    function validateCausePage(){

        cy.location('pathname').should('include', '/page/50003/survey/2')
        cy.get('#en__field_transaction_svblock_522035_svquestion_5220370').click()
        cy.get('#en__field_transaction_svblock_522035_svquestion_5220360').click()
        cy.get('button').click()

    }

    function validateThankYouPage(){

        cy.location('pathname').should('include', '/page/50003/survey/3')
        cy.get('.en__component--column > .en__component').as('thankcopy')
        cy.get('@thankcopy').contains('ST')
        cy.get('@thankcopy').contains('Survey -Toronto')
        cy.get('@thankcopy').contains('address1')
        cy.get('@thankcopy').contains('Tribeca')
        cy.get('@thankcopy').contains('NY')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('111222')
        cy.get('@thankcopy').contains('USA')
    }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_survey_toronto_' + todaysDate + '@tellamazingstories.com')
      
     it('searches for the supporters single donation transaction', () => {
     
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