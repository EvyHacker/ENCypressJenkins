/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_ecard_toronto_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/54123/action/1')
  })

  it('submits successfully sends an ecard', () => {
        
    cy.get('.en__ecarditems__action > .en__ecarditems__button').as('previewButton')
    cy.get('@previewButton').click()
    cy.get('.en__ecarditems__prevclose').as('previewClose')
    cy.get('@previewClose').click()
    cy.get('[data-id="282840"] > img').click()
    cy.get('@previewButton').click()
    cy.get('@previewClose').click()
    cy.get('.thumb--active > img').click()
    cy.get('@previewButton').click()
    cy.get('@previewClose').click()

    cy.get('.en__ecardmessage__default').type('This is test mesaage')
    cy.get('.en__ecardrecipients__name > input').type('Evy Test')
    cy.get('.en__ecardrecipients__email > input').type(email)
    cy.get('.en__ecardrecipients__email > .en__ecarditems__button').click()
    cy.get('.ecardrecipient__name').should('have.value', 'Evy Test')
    cy.get('.ecardrecipient__email').should('have.value', email)

    cy.get('#en__field_supporter_firstName').type('ST_Ecard')
    cy.get('#en__field_supporter_lastName').type('Toronto')
    cy.get('#en__field_supporter_emailAddress').type(email)
    cy.get('.en__submit > button').click()

    validateThankYouPage()

})

function validateThankYouPage(){

    cy.location('pathname').should('include', '/page/54123/action/2')
    cy.get('.content').as('thankcopy')
    cy.get('@thankcopy').contains('ST_Ecard')
    cy.get('@thankcopy').contains('Toronto')
    cy.get('@thankcopy').contains(email)

    }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_ecard_toronto_' + todaysDate + '@engagingnetworks.online')
      
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