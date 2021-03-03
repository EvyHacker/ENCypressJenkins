/// <reference types="Cypress" />
describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('ett_postal_target_' + todaysDate + '@engagingnetworks.online')
    beforeEach(() => {
        cy.visit(Cypress.env('dallas')+'page/15183/action/1')
      })

    it('sends an email to target', () =>{

        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Test')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('1146 19th Street NW, Suite 800')
        cy.get('#en__field_supporter_city').type('Washington')
        cy.get('#en__field_supporter_region').select('DC')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/15183/action/2')

        validateETTMessage()

        cy.location('pathname').should('include', '/page/15183/action/3')
        validateThankYouPage()
    
    })

    function validateETTMessage(){

        cy.get('.en__contactDetails__row--1').invoke('text').should('include', 'Mr').and('include', 'Dan')
        .and('include', 'Szymczak')
        cy.get('.en__field__input').then(($text) => {
            if($text.attr('value').includes('ST_ETT Postal Database #1')){
                cy.get('.en__field__input').type(' This is test message #1')
             // expect(cy.get('.en__contactMessage__htmlDisplay').should('have.value', 'Message (#1): ST_ETT Postal Database')
            }else{
              cy.get('.en__field__input').should('have.value', 'ST_ETT Postal Database  #2')
              cy.get('.en__field__input').type(' This is test message #2')
            }    
            cy.get('button').click()
        })
}

    function validateThankYouPage(){

        cy.get(':nth-child(5) > span').as('thankcopy')
        cy.get('@thankcopy').contains('Evy')
        cy.get('@thankcopy').contains('Test')
        cy.get('@thankcopy').contains(email)
        cy.get('@thankcopy').contains('GB')
    }
})
// describe('test us.e-activist LogIn ', ()=>{

//     const todaysDate = Cypress.moment().format('MM_DD_YYYY')
//     const email = ('ett_postal_target_' + todaysDate + '@engagingnetworks.online')
    
//       it('searches for the supporters ett transactions', () => {
     
//           logIn()
//           cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
//           .type(email)
//           cy.get('.userInput__action > .button').click()
//           cy.get('.icon--search--color').click()
//           cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
//             expect(text.trim()).contains('ett')
//         })
//         logOut()
//       })
  
//       function logIn(){
       
//         cy.visit(Cypress.env('dallasLogIn')+'#login')
//         if(cy.location('pathname').should('have', '#login')){
//          cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
//          cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
//          cy.get('.button').click()
//         } else{cy.visit(Cypress.env('dallasLogIn') + '#dashboard', {delay : 3000})
//         }
//       }
//       function logOut(){

//         cy.get('.dashboard__action--close').click()
//         cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
//         cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
//         cy.url().should('contain','#login')
//       }
// })