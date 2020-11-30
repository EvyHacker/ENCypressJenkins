/// <reference types="Cypress" />


describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const emailSingle = ('st_singledonation_toronto_tracking' + todaysDate + '@tellamazingstories.com')
  const emailRecur = ('st_recurdonation_toronto_tracking' + todaysDate + '@tellamazingstories.com')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/49780/donate/1?ea.tracking.id=en_email&utm_content=ST_Single%20&%20Recurring%20Donation_ORIG%20-%20Toronto%20IATS&utm_campaign=Test_Toronto&utm_medium=email&utm_source=engagingnetworks&utm_term=termtest_toronto')
  })

    it('loads with correct page 1 content', () => {
     
        cy.get('.en__component--row--1 > .en__component--column > .en__component > :nth-child(1)')
        .should('have', 'SST_Single / Recurring Donation with Two Gateways (Paypal / IATS)')
      })

    it('has correct data', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST Fundraising - Toronto')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Smoke Test')
        cy.get('#en__field_supporter_emailAddress')
        .should('have.value', 'st_singlerecurdonation_toronto@tellamazingstories.com')
        cy.get('#en__field_supporter_address1').should('have.value', 'manhattan')
        cy.get('#en__field_supporter_city').should('have.value', 'New York')
        cy.get('#en__field_supporter_postcode').should('have.value', '06879')
        cy.get('#en__field_supporter_region').should('have.value', 'New York')
        cy.get('#en__field_supporter_country').should('have.value', 'USA')
        cy.get('#en__field_transaction_paycurrency').should('have.value', 'USD')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222220')
        cy.get('#en__field_transaction_ccvv').should('have.value', '222')
      })

    it('submits single transaction for IATS', () => {
   
        cy.get('#en__field_supporter_emailAddress').clear().type(emailSingle)
        AddMissingFileds()
        cy.get('#en__field_transaction_donationAmt1').click()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get('.en__component > :nth-child(17)').contains('CREDIT_SINGLE')
        cy.get('.en__component > :nth-child(10)').contains(emailSingle)
        cy.get(':nth-child(24)').contains('$2.00')

     })

    it('submits recurring transaction for IATS', () => {

        cy.get('#en__field_supporter_emailAddress').clear().type(emailRecur) 
        cy.get('#en__field_transaction_recurrpay').check()
        cy.get('#en__field_transaction_recurrfreq').type('MONTHLY')
        AddMissingFileds()
        cy.get('button').click()
       
        ValidateThankYouPage()
        cy.get('.en__component > :nth-child(17)').contains('CREDIT_RECURRING')
        cy.get('.en__component > :nth-child(10)').contains(emailRecur)
        cy.get(':nth-child(24)').contains('$1.00')
     })

     function AddMissingFileds(){

      cy.get('#en__field_transaction_ccexpire').type('01')
      cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2022')
      
     }

     function ValidateThankYouPage(){

      cy.location('pathname').should('have', '/page/49780/donate/2')
      cy.get('.en__component--column').as('thankyoucopy')
      cy.get('@thankyoucopy').contains( 'ST Fundraising - Toronto')
      cy.get('@thankyoucopy').contains('Smoke Test')
      cy.get('@thankyoucopy').contains('manhattan')
      cy.get('@thankyoucopy').contains('New York')
      cy.get('@thankyoucopy').contains('New York')
      cy.get('@thankyoucopy').contains('06879')
      cy.get('@thankyoucopy').contains('USA')
      cy.get('@thankyoucopy').contains('160123')        
      cy.get('@thankyoucopy').contains('USD')
      cy.get('@thankyoucopy').contains('IATS North America')
      cy.get('@thankyoucopy').contains('VISA')        

     }
    
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailSingle = ('st_singledonation_toronto_tracking' + todaysDate + '@tellamazingstories.com')
    const emailRecur = ('st_recurdonation_toronto_tracking' + todaysDate + '@tellamazingstories.com')
      
      it('searches for the supporters single donation transaction', () =>{
  
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
     it('searches for the supporters recurring donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(emailRecur)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('fcr')
          logOut()
      })
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