/// <reference types="Cypress" />

describe('test Custom target DB default information', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailDefault = ('pb_CustomTargetDefault_' + todaysDate + '@engagingnetworks.online')

    it('has correct default data', () =>{

        cy.visit(Cypress.env('test')+'page/13116/action/1')

        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13116/action/2')
        cy.get('.en__contactDetails').invoke('text').as('contactDetails')
        cy.get('@contactDetails').should('include', 'Contact Data title: Ms')
        cy.get('@contactDetails').should('include', 'Contact Data First Name: Evy')
        cy.get('@contactDetails').should('include', 'Contact Data Last Name: Tester')
        cy.get('@contactDetails').should('include', 'Contact Data Organization: ENS')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13116/action/3')   
        cy.get('.en__component--column').invoke('text').as('thankyouPage')   
        cy.get('@thankyouPage').should('include', 'First Name: Custom Target')
        cy.get('@thankyouPage').should('include', 'Last Name: Default')
        cy.get('@thankyouPage').should('include', 'Email Address: ' + emailDefault.toLowerCase())
        cy.get('@thankyouPage').should('include', 'Country: US')

    })
})

// describe('test adding biographical information ', ()=>{

//     const todaysDate = Cypress.moment().format('MM_DD_YYYY')
//     const emailSingle = ('st_eventssingleticket_' + todaysDate + '@engagingnetworks.online')
//     const emailGroup = ('st_eventsgroupticket_' + todaysDate + '@engagingnetworks.online')
    
//       it('searches for the single ticket transaction', () => {
     
//           logIn()
//           cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
//           .type(emailSingle)
//           cy.get('.userInput__action > .button').click()
//           cy.get('.icon--search--color').click()
//           cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
//             expect(text.trim()).contains('ecs')
//         })
//         logOut()
//       })
  
//       it('searches for the group ticket transaction', () => {
     
//         logIn()
//         cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
//         .type(emailGroup)
//         cy.get('.userInput__action > .button').click()
//         cy.get('.icon--search--color').click()
//         cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
//           expect(text.trim()).contains('ecs')
//       })
//       logOut()
//     })

//     function logIn(){
       
//         cy.visit(Cypress.env('testLogIn')+'#login')
//         if(cy.location('pathname').should('have', '#login')){
//          cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
//          cy.get('#enLoginPassword').type(Cypress.env('testUserPassword'))
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