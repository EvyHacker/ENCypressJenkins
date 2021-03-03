/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_customdb_' + todaysDate + '@engagingnetworks.online')
    
    beforeEach(() => {
        cy.visit(Cypress.env('dallas')+'page/15186/action/1')   
      })

    it('sends an email to target#1', () =>{

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_region').select('DC')
        cy.get('button').click()

        validateEditMessage1()
        cy.get('button').click()
        
        
        validateThankYouPage()
        cy.get(':nth-child(5) > span').contains('Evy')
  
    })

    it('sends an email to target#2', () =>{

        cy.get('#en__field_supporter_firstName').type('custom')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_region').select('DC')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/15186/action/2')

        validateEditMessage2()

        cy.get('button').click()
        cy.location('pathname').should('include', '/page/15186/action/3')
        validateThankYouPage()
        cy.get(':nth-child(5) > span').contains('custom')
    })

function validateEditMessage1(){

        cy.location('pathname').should('include', '/page/15186/action/2')
        cy.get('.en__contactDetails__row--1').invoke('text').should('include', 'Ms').and('include', 'Smoke Test_Custom DB')
        .and('include', 'Database')
        cy.get('.en__field__input').should('have.value', 'ST_ETT Custom Database (Editable Regions) Dallas #1')
        cy.get(':nth-child(3) > .en__contactSection__content > .en__contactMessage > .en__field')
                .type('\nThis is to test message#1')
}

function validateEditMessage2(){

    cy.location('pathname').should('include', '/page/15186/action/2')
    cy.get('.en__contactDetails__row--1').invoke('text').should('include', 'Ms').and('include', 'Smoke Test_Custom DB')
    .and('include', 'Database')
    cy.get('.en__field__input').should('have.value', 'ST_ETT Custom Database (Editable Regions) Dallas #2')
    cy.get(':nth-child(3) > .en__contactSection__content > .en__contactMessage > .en__field')
            .type('\nThis is to test message#2')
}

function validateThankYouPage(){

    cy.location('pathname').should('include', '/page/15186/action/3')
    cy.get(':nth-child(5) > span').as('thankcopy')
    cy.get('@thankcopy').contains('Test')
    cy.get('@thankcopy').contains(email)
    cy.get('@thankcopy').contains('GB')
}

})
describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_customdb_' + todaysDate + '@engagingnetworks.online')
    it('searches for the supporters donation transaction', () => {

        logIn()

        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).equal('ett')
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