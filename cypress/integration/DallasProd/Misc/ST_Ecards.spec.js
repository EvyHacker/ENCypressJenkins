/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_ecard_dallas_' + todaysDate + '@tellamazingstories.com')
    const email1 = ('st_ecard_dallas_1_' + todaysDate + '@tellamazingstories.com')
    const email2 = ('st_ecard_dallas_2_' + todaysDate + '@tellamazingstories.com')
    const email3 = ('st_ecard_dallas_3_' + todaysDate + '@tellamazingstories.com')
    
    beforeEach(() => {
        cy.visit(Cypress.env('dallas')+'page/15833/action/1')
      })

    it('can submit the form', () => {

    cy.get('.en__ecardmessage__default').type('This is test mesaage')
    cy.get('.en__ecardrecipients__name > input').type('Evy Test')
    cy.get('.en__ecardrecipients__email > input').type(email)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.ecardrecipient__name').should('have.value', 'Evy Test')
    cy.get('.ecardrecipient__email').should('have.value', email)

    cy.get('#en__field_supporter_firstName').type('ST_Ecard')
    cy.get('#en__field_supporter_lastName').type('Dallas')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('.en__submit > button').click()

    validateThankYouPage()
        
})

it('can add and remove multi recepients', () => {

    cy.get('.en__ecardmessage__default').type('This is test mesaage')
    cy.get('.en__ecardrecipients__name > input').type('Evy Test')
    cy.get('.en__ecardrecipients__email > input').type(email)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.en__ecardrecipients__name > input').clear().type('Evy Test1')
    cy.get('.en__ecardrecipients__email > input').clear().type(email1)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.en__ecardrecipients__name > input').clear().type('Evy Test2')
    cy.get('.en__ecardrecipients__email > input').clear().type(email2)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.en__ecardrecipients__name > input').clear().type('Evy Test3')
    cy.get('.en__ecardrecipients__email > input').clear().type(email3)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.ecardrecipient__name').should('have.length', 4)
    cy.get('.ecardrecipient__email').should('have.length', 4)

    cy.get(':nth-child(2) > .ecardrecipient__remove > button').click()
    cy.get('.ecardrecipient__name').should('have.length', 3)
    cy.get('.ecardrecipient__email').should('have.length', 3)
    cy.get('#en__field_supporter_firstName').type('ST_Ecard')
    cy.get('#en__field_supporter_lastName').type('Dallas')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('.en__submit > button').click()

    validateThankYouPage()

})

function validateThankYouPage(){

     cy.location('pathname').should('include', '/page/15833/action/2')
     cy.get('.content').as('thankcopy')
     cy.get('@thankcopy').contains('ST_Ecard')
     cy.get('@thankcopy').contains('Dallas')
     cy.get('@thankcopy').contains(email)
    
 }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_ecard_dallas_' + todaysDate + '@tellamazingstories.com')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('ecf')
      })
      logOut()
    })
  
     function logIn(){
        cy.visit(Cypress.env('dallasLogIn')+'#login')

          if(cy.location('pathname').should('have', '#login')){
             cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
             cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
             cy.get('.button').click()
      }else{cy.visit(Cypress.env('dallasLogIn') + '#dashboard', {delay : 3000})
        }
      }
      function logOut(){
  
          cy.get('.dashboard__action--close').click()
          cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
          cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
          cy.url().should('contain','#login')
      }
    })