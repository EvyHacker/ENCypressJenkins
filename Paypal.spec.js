describe('test Single donation PayPal', ()=>{
        const todaysDate = Cypress.moment().format('MM_DD_YYYY')
        const email = ('st_donationtwogateways_' + todaysDate + '@tellamazingstories.com')

    it('adds missing fields for Paypal for Recurring donation', () => {
        cy.visit('page/13848/donate/1') 
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_transaction_paymenttype').select('Paypal')  
        cy.get('#en__field_transaction_ccnumber').type('4111111111111111')
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2022')
        cy.get('#en__field_transaction_donationAmt1').click()
        cy.get('button').click()
        cy.location().then((loc) => {
          cy.log(loc.href)
          const url = loc.href
          cy.request(url)  
          cy.get('#password').type('Testing123**')
          cy.get('#btnLogin').click()
        })
      
     
      
        // cy.get('#flowID').then(function(el){
        //   const url = el.val()
        //   cy.log(url)
        // })
        // cy.url() 
 
        
  })
    // it('complites paypal transaction', () => {

    //     cy.location('pathname').should('have', 'https://www.sandbox.paypal.com/webscr?cmd=_express-checkout')
    //    // cy.get('#email').should('eq', 'en_test_buyer@tellamazingstories.com')
    //     cy.get('#password').type('Testing123**')
    //     cy.get('#btnLogin').click()
    //     cy.on('url:changed', newUrl => {
    //       console.log('newUrl', newUrl)
    //     })
    //    // cy.visit(newUrl)
    //     //cy.get('button').click()
    // })
    // it('complites the transaction', () => {

    //   //cy.get('button').click()
    // })
})