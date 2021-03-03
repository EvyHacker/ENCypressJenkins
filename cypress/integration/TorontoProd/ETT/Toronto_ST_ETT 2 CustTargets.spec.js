describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('ett_2custom_target_toronto_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/50120/action/1')
  })

    it('sends succsessfully email', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST ETT')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Custom Target - Toronto')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').should('have.value', '1146 19th Street NW')
        cy.get('#en__field_supporter_city').should('have.value', 'NW')
        cy.get('#en__field_supporter_region').should('have.value', 'WA')
        cy.get('#en__field_supporter_country').select('USA')
        cy.get('#en__field_supporter_postcode').type('20036')
        cy.get('.en__contactDetails__row--1').invoke('text').then((text) => {
          expect(text.trim()).contains('Mr')
          expect(text.trim()).contains('ETT Custom Target')
          expect(text.trim()).contains('Toronto')
        })
        cy.get('.en__contact--18633 > .en__contact__detail').invoke('text').then((text) => {
          expect(text.trim()).contains('Mr')
          expect(text.trim()).contains('Toronto Custom')
          expect(text.trim()).contains('Target 2')
          cy.get('.en__contactSubject > .en__field__input').should('have.value', 'Subject: ST_ETT 2 Custom Targets (Plain Text) Toronto')
        })
    
        cy.get('button').click()

        cy.location('pathname').should('have', '/page/50120/action/2')

        cy.get(':nth-child(5) > span').as('thankcopy')
        cy.get('@thankcopy').contains('ST ETT')
        cy.get('@thankcopy').contains('Custom Target - Toronto')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('USA')
      
    })
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('ett_2custom_target_toronto_' + todaysDate + '@engagingnetworks.online')
      
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