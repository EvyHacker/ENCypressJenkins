/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_customdb_' + todaysDate + '@tellamazingstories.com')
    
    beforeEach(() => {
        
        cy.visit(Cypress.env('toronto')+'page/49987/action/1')
        
      })
    it('loads with correct page 1 content', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST ETT custom')
        cy.get('#en__field_supporter_lastName').should('have.value', 'database - Toronto')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_ettsupportertoronto@tellamazingstories.com')
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_postcode').should('have.value', '111222')
     })

    it('sends an email to target#1', () =>{

        cy.get('#en__field_supporter_firstName').clear().type('ST ETT')
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

         validateEditMessage1()
        cy.get('button').click()

        validateThankYouPage()
        cy.get(':nth-child(5) > span').contains('ST ETT')
  
    })

    it('sends an email to target#2', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

        validateEditMessage2()

        cy.get('button').click()
        
        validateThankYouPage()
        cy.get(':nth-child(5) > span').contains('ST ETT custom')
    })

function validateEditMessage1(){

    cy.location('pathname').should('include', '/page/49987/action/2')
    cy.get('.en__contact__detail').invoke('text').should('include', 'Smoke Test_Custom DB').and('include', 'Database')
    cy.get('.en__field__input').should('have.value', 'ST_ETT Custom Database (Editable Regions) Toronto #1')
    cy.get(':nth-child(3) > .en__contactSection__content > .en__contactMessage > .en__field').type('\nThis is to test message#1')
}

function validateEditMessage2(){

    cy.location('pathname').should('include', '/page/49987/action/2')
    cy.get('.en__contact__detail').invoke('text').should('include', 'Smoke Test_Custom DB').and('include', 'Database')
    cy.get('.en__field__input').should('have.value', 'ST_ETT Custom Database (Editable Regions) Toronto #2')
    cy.get(':nth-child(3) > .en__contactSection__content > .en__contactMessage > .en__field').type('\nThis is to test message#2')
}

function validateThankYouPage(){

    cy.location('pathname').should('include', '/page/49987/action/3')
    cy.get(':nth-child(5) > span').as('thankcopy')
    cy.get('@thankcopy').contains('database - Toronto')
    cy.get('@thankcopy').contains(email)
    cy.get('@thankcopy').contains('USA')
}

})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_customdb_' + todaysDate + '@tellamazingstories.com')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('ett')
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