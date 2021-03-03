/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_signupformdallas_' + todaysDate + '@engagingnetworks.online')
    
    beforeEach(() => {
      cy.visit(Cypress.env('dallas')+'page/15239/subscribe/1')
      })

    it('can sign up for plant trees', () => {

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        //Validate ST_Optin mandatory field
        cy.get('#en__field_supporter_questions_1653760').check()
        cy.get('.en__field__input--select').should('have.value', 'Plant Trees')
        cy.get('#en__field_supporter_questions_1661490').click()
        cy.get('.en__field__input--textarea').type('This is Red Plant Tress Test')
        cy.get('button').click()

        cy.get('.en__field__error').should('have.text', 'ST_Optin Mandatory Field Empty')
        cy.get('.en__field--checkbox > .en__field__element > .en__field__item').click()
        cy.get('button').click()
        ValidateThankYouPage()

    })

    it('can sign up for Clean the Seas', () => {

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('.en__field--checkbox > .en__field__element > .en__field__item').click()
        cy.get('#en__field_supporter_questions_1653761').click()
        cy.get('.en__field__input--select').select('Clean the Seas').should('have.value', 'Clean the Seas')
        cy.get('#en__field_supporter_questions_1661491').click()
        cy.get('#en__field_supporter_questions_166150').select('VI').should('have.value', 'VI')
        cy.get('.en__field__input--textarea').type('This is Clean the Seas Test')
        cy.get('button').click()
        ValidateThankYouPage()

    })

    it('can sign up for Recycle', () => {

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('.en__field--checkbox > .en__field__element > .en__field__item').click()
        cy.get('#en__field_supporter_questions_1653761').click()
        cy.get('.en__field__input--select').select('Recycle').should('have.value', 'Recycle')
        cy.get('#en__field_supporter_questions_1661492').click()
        cy.get('#en__field_supporter_questions_166150').select('VI').should('have.value', 'VI')
        cy.get('.en__field--splitselect > .en__field__element > :nth-child(3) > .en__field__input').select('IV').should('have.value', 'IV')
        cy.get('.en__field__input--textarea').type('This is Recycle Test')
        cy.get('button').click()
        ValidateThankYouPage()

    })

    function ValidateThankYouPage(){

        cy.location('pathname').should('include', '/page/15239/subscribe/2')
        cy.get('.en__component').as('thankcopy')
        cy.get('@thankcopy').contains('Evy')
        cy.get('@thankcopy').contains('Test')
        cy.get('@thankcopy').contains(email)
    }
})
describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_signupformdallas_' + todaysDate + '@engagingnetworks.online')
    
      it('searches for the supporters ett transactions', () => {
     
          logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(email)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('qcb')
            expect(text.trim()).contains('ems')
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