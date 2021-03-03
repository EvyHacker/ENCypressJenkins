/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('ett_customdb_dallas_2targets_' + todaysDate + '@engagingnetworks.online')
    beforeEach(() => {
      cy.visit(Cypress.env('dallas')+'page/15185/action/1')
      })

    it('loads with correct page 1 content', () => {

        cy.get(':nth-child(1) > [style="font-size:12px;"] > span')
        .should('have.text', 'Page Name: ST_ETT 2 Custom Targets (Plain Text) Dallas')
        cy.get(':nth-child(2) > [style="font-size:12px;"] > span')
        .should('have.text', 'Language: English only')
        
       //Validate 1st email to target
        cy.get('.en__contact--3738 > .en__contact__detail').invoke('text').
        should('include', 'Mr').and('include', 'ETT Custom DB').and('include', 'Dallas').and('include', 'Smoke Testing')
        cy.get('.en__contact--3738 > .en__contact__detail > .en__contactMessage > .en__field').invoke('text').then((text) => {
            expect(text.trim()).contains('Ms')
            expect(text.trim()).contains('My message to ETT Custom DB Dallas')
            expect(text.trim()).contains('ST_ETT 2 Custom Targets (HTML) Dallas')
            expect(text.trim()).contains('Kind regards,')
          })

        //Validate 2nd email to target
        cy.get('.en__contact--3739 > .en__contact__detail').invoke('text').
        should('include', 'Ms').and('include', 'Dallas Custom').and('include', 'Target 2').and('include', 'Custom Org')
        cy.get('.en__contact--3739 > .en__contact__toggle').click()
        cy.get('.en__contact--3739 > .en__contact__detail > .en__contactMessage > .en__field').invoke('text').then((text) => {
            expect(text.trim()).contains('Dear')
            expect(text.trim()).contains('My message to Dallas Custom Target 2')
            expect(text.trim()).contains('ST_ETT 2 Custom Targets (HTML) Dallas')
            expect(text.trim()).contains('Kind regards,')
          })  
    })

    it('sends an email to target', () =>{

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_region').select('DC')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_postcode').type('20036')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/15185/action/2')

        cy.get(':nth-child(5) > span').as('thankcopy')
        cy.get('@thankcopy').contains('Evy')
        cy.get('@thankcopy').contains('Test')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('US')
        
    })
})
describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('ett_customdb_dallas_2targets_' + todaysDate + '@engagingnetworks.online')
    
      it('searches for the supporters ett transactions', () => {
     
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