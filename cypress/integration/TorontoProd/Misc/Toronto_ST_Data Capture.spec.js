/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_datacapture_toronto_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/56962/data/1')
  })

  it('submits successfully a donation with: red color,one cause and Y to attend', () => {
        
    cy.get('#en__field_supporter_firstName').type('ST - Toronto Data Capture')
    cy.get('#en__field_supporter_lastName').type('Smoke Test')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('#en__field_supporter_region').select('NY')
    cy.get('#en__field_supporter_country').select('USA')
    cy.get('#en__field_supporter_questions_4123').check()
    cy.get('#en__field_supporter_questions_4124').check()
    cy.get('#en__field_supporter_questions_5818070').click()
    cy.get('#en__field_supporter_questions_5818510').click()
    cy.get('#en__field_supporter_questions_2704450').click()
    cy.get('#en__field_supporter_questions_5763').type('This is Data Capture test')
    
    cy.get('button').click()

    validateThankYouPage()

})
it('submits successfully a donation with: blue color,one cause and N to attend', () => {
        
    cy.get('#en__field_supporter_firstName').type('ST - Toronto Data Capture')
    cy.get('#en__field_supporter_lastName').type('Smoke Test')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('#en__field_supporter_region').select('NY')
    cy.get('#en__field_supporter_country').select('USA')
    cy.get('#en__field_supporter_questions_4123').check()
    cy.get('#en__field_supporter_questions_4124').check()
    cy.get('#en__field_supporter_questions_5818071').click()
    cy.get('#en__field_supporter_questions_5818510').click()
    cy.get('#en__field_supporter_questions_2704451').click()
    cy.get('#en__field_supporter_questions_5763').type('This is Data Capture test')
  
     cy.get('button').click()

  validateThankYouPage()
})

it('submits successfully a donation with: green color,no cause and N to attend', () => {
        
  cy.get('#en__field_supporter_firstName').type('ST - Toronto Data Capture')
  cy.get('#en__field_supporter_lastName').type('Smoke Test')
  cy.get('#en__field_supporter_emailAddress').type(email)
  cy.get('#en__field_supporter_region').select('NY')
  cy.get('#en__field_supporter_country').select('USA')
  cy.get('#en__field_supporter_questions_4123').check()
  cy.get('#en__field_supporter_questions_4124').check()
  cy.get('#en__field_supporter_questions_5818072').click()
  cy.get('#en__field_supporter_questions_5818511').click()
  cy.get('#en__field_supporter_questions_2704451').click()
  cy.get('#en__field_supporter_questions_5763').type('This is Data Capture test')

   cy.get('button').click()

validateThankYouPage()
})

it('can not submit donation without opt-in questions', () => {
        
  cy.get('#en__field_supporter_firstName').type('ST - Toronto Data Capture')
  cy.get('#en__field_supporter_lastName').type('Smoke Test')
  cy.get('#en__field_supporter_emailAddress').type(email)
  cy.get('#en__field_supporter_region').select('NY')
  cy.get('#en__field_supporter_country').select('USA')
  cy.get('button').click()

  cy.get('.en__field--581807 > .en__field__error').should('have.text', 'What is your favorite color? is a mandatory form field.')
  cy.get('.en__field--581851 > .en__field__error').should('have.text', 'Are you one with this cause? is a mandatory form field.')
  cy.get('.en__field--textarea > .en__field__error').should('have.text', 'Personal Comments Q is a mandatory form field.')
  cy.get('#en__field_supporter_questions_5818073').click()
  cy.get('#en__field_supporter_questions_5818511').click()
  cy.get('#en__field_supporter_questions_5763').type('This is Data Capture test')

  cy.get('button').click()
  validateThankYouPage()
})

function validateThankYouPage(){

    cy.location('pathname').should('include', '/page/56962/data/2')
    cy.get('.content').as('thankcopy')
    cy.get('@thankcopy').contains('ST - Toronto Data Capture')
    cy.get('@thankcopy').contains('Smoke Test')
    cy.get('@thankcopy').contains(email)

    }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_datacapture_toronto_' + todaysDate + '@engagingnetworks.online')
      
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
        cy.visit(Cypress.env('torontoLogIn')+'#login')

             cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
             cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
             cy.get('.button').click()
             
             if(cy.url().should('contains', '#login/tos')){
                cy.get('.enSandbox__tos__agree').click()
            }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})}
    
        
      }
    function logOut(){

        cy.get('.dashboard__action--close').click()
        cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
        cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
        cy.url().should('contain','#login')
    }
  })