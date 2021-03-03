/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_datacapture_dallas_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('dallas')+'page/17336/data/1')
  })

  it('submits successfully a donation with: opt in checked,volunteer Y ,one cause and once a year', () => {
        
    cy.get('#en__field_supporter_firstName').type('ST - Dallas Data Capture')
    cy.get('#en__field_supporter_lastName').type('Smoke Test')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('#en__field_supporter_region').select('NY')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_supporter_questions_1744060').click()
    cy.get('#en__field_supporter_questions_165377').should('have.value', 'Plant Trees')
    cy.get('#en__field_supporter_questions_1653760').click()
    cy.get('#en__field_supporter_questions_174407').should('have.value', 'once a year')
    cy.get('#en__field_transaction_comments').type('This is Data Capture with Plant Trees test')
    cy.get('button').click()

    validateThankYouPage()
    cy.get('.content').contains('This is Data Capture with Plant Trees test')
})
it('submits successfully a donation with: opt in unchecked,volunteer Y ,one cause and twice a year', () => {
        
    cy.get('#en__field_supporter_firstName').type('ST - Dallas Data Capture')
    cy.get('#en__field_supporter_lastName').type('Smoke Test')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('#en__field_supporter_region').select('NY')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_supporter_questions_10239').click()
    cy.get('#en__field_supporter_questions_1744060').click()
    cy.get('#en__field_supporter_questions_165377').select('Clean the Seas').should('have.value', 'Clean the Seas')
    cy.get('#en__field_supporter_questions_1653760').click()
    cy.get('#en__field_supporter_questions_174407').select('twice a year').should('have.value', 'twice a year')
    cy.get('#en__field_transaction_comments').type('This is Data Capture with Clean the Seas test')
    cy.get('button').click()

    validateThankYouPage()
    cy.get('.content').contains('This is Data Capture with Clean the Seas test')
})

it('submits successfully a donation with: opt in checked,volunteer N, No cause and thrice a year', () => {
        
    cy.get('#en__field_supporter_firstName').type('ST - Dallas Data Capture')
    cy.get('#en__field_supporter_lastName').type('Smoke Test')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('#en__field_supporter_region').select('NY')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_supporter_questions_1744061').click()
    cy.get('#en__field_supporter_questions_165377').select('Recycle').should('have.value', 'Recycle')
    cy.get('#en__field_supporter_questions_1653761').click()
    cy.get('#en__field_supporter_questions_174407').select('thrice a year').should('have.value', 'thrice a year')
    cy.get('#en__field_transaction_comments').type('This is Data Capture with Recycle test')
    cy.get('button').click()

    validateThankYouPage()
    cy.get('.content').contains('This is Data Capture with Recycle test')
})

it('can not submit donation without opt-in questions', () => {
        
  cy.get('#en__field_supporter_firstName').type('ST - Dallas Data Capture')
  cy.get('#en__field_supporter_lastName').type('Smoke Test')
  cy.get('#en__field_supporter_emailAddress').type(email)
  cy.get('#en__field_supporter_region').select('NY')
  cy.get('#en__field_supporter_country').select('US')
  cy.get('button').click()

  cy.get('.en__field--174406 > .en__field__error').should('have.text', 'Would you like to be a volunteer? Mandatory Field Empty')
  cy.get('.en__field--165376 > .en__field__error').should('have.text', 'Are you one with this cause? Mandatory Field Empty')
  cy.get('.en__field--textarea > .en__field__error').should('have.text', 'Comments Mandatory Field Empty')
  cy.get('#en__field_supporter_questions_1744060').click()
  cy.get('#en__field_supporter_questions_1653760').click()
  cy.get('#en__field_transaction_comments').type('This is Data Capture test')

  cy.get('button').click()
  validateThankYouPage()
  cy.get('.content').contains('This is Data Capture test')

})

function validateThankYouPage(){

    cy.location('pathname').should('include', '/page/17336/data/2')
    cy.get('.content').as('thankcopy')
    cy.get('@thankcopy').contains('ST - Dallas Data Capture')
    cy.get('@thankcopy').contains('Smoke Test')
    cy.get('@thankcopy').contains(email)

    }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_datacapture_dallas_' + todaysDate + '@engagingnetworks.online')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('dcf')
          expect(text.trim()).contains('qcb')
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