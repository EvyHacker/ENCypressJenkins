/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const emailSingle = ('st_singledonation_toronto_iats_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/55989/donate/1')
  })

    it('has correct data', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST - Toronto')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Smoke Test')
        cy.get('#en__field_supporter_emailAddress')
        .should('have.value', 'st_singledonation_toronto@engagingnetworks.online')
        cy.get('#en__field_supporter_address1').should('have.value', 'manhattan')
        cy.get('#en__field_supporter_city').should('have.value', 'New York')
        cy.get('#en__field_supporter_postcode').should('have.value', '06879')
        cy.get('#en__field_supporter_region').should('have.value', 'New York')
        cy.get('#en__field_supporter_country').should('have.value', 'USA')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_transaction_paycurrency').should('have.value', 'USD')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222220')
        cy.get('#en__field_transaction_ccvv').should('have.value', '222')
      
      })

    it('submits recurring transaction for IATS', () => {
   
        cy.get('#en__field_supporter_emailAddress').clear().type(emailSingle)
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2022')
        cy.get('button').click()

        ValidateThankYouPage()
     })
  
       function ValidateThankYouPage(){
  
        cy.location('pathname').should('include', '/page/55989/donate/2')
        cy.get('.en__component--column').as('thankyoucopy')
        cy.get('@thankyoucopy').contains( 'ST - Toronto')
        cy.get('@thankyoucopy').contains('Smoke Test')
        cy.get('@thankyoucopy').contains('manhattan')
        cy.get('@thankyoucopy').contains('New York')
        cy.get('@thankyoucopy').contains('New York')
        cy.get('@thankyoucopy').contains(emailSingle)
        cy.get('@thankyoucopy').contains('06879')
        cy.get('@thankyoucopy').contains('USA')
        cy.get('@thankyoucopy').contains('172867')   
        cy.get('@thankyoucopy').contains('CREDIT_SINGLE')     
        cy.get('@thankyoucopy').contains('USD')
        cy.get('@thankyoucopy').contains('IATS North America')
        cy.get('@thankyoucopy').contains('VISA')   
        cy.get(':nth-child(24)').contains('$1.00')     
  
       }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailSingle = ('st_singledonation_toronto_iats_' + todaysDate + '@engagingnetworks.online')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(emailSingle)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('fcs')
          logOut()
      })
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