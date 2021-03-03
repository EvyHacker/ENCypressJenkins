describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('ett_postal_db_toronto_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/49985/action/1')
  })

    it('sends succsessfully email', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST ETT')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Postal Database - Toronto')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_ettsupportertoronto@engagingnetworks.online')
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_country').select('USA')
        cy.get('#en__field_supporter_postcode').should('have.value', 'D123AA')
    
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/49985/action/2')

        validateETTMessage()

        cy.get('button').click()

        cy.location('pathname').should('include', '/page/49985/action/3')
        validateThankYouPage()
      })

    function validateETTMessage(){

       cy.get('.en__contactDetails__row--1').invoke('text').should('include', 'Mr').and('include', 'Dan')
      .and('include', 'Szymczak')
      cy.get('.en__field__input').then(($text) => {
      if($text.attr('value')==='ST_ETT Postal Database Toronto #1'){
        cy.get('.en__field__input').type(' This is test message #1')
       // expect(cy.get('.en__contactMessage__htmlDisplay').should('have.value', 'Message (#1): ST_ETT Postal Database')
      }else{
        cy.get('.en__field__input').should('have.value', 'ST_ETT Postal Database Toronto #2')
        cy.get('.en__field__input').type(' This is test message #2')
      }    
    })
  }
    function validateThankYouPage(){

      cy.get(':nth-child(5) > span').as('thankcopy')
      cy.get('@thankcopy').contains('ST ETT')
      cy.get('@thankcopy').contains('Postal Database - Toronto')
      cy.get('@thankcopy').contains(email)
      cy.get('@thankcopy').contains('USA')
  }
})  
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('ett_postal_db_toronto_' + todaysDate + '@engagingnetworks.online')
      
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