

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  
  })
  
  describe('test fee cover and DtD for Worldpay  gateway for 3D transaction', ()=>{
      const todaysDate = Cypress.moment().format('MM_DD_YYYY')
      const donationSingle = ('en_stripe_single_donation' + todaysDate + '@engagingnetworks.online')
      const donationSingleFixed = ('en_stripe_single_donation_fixed' + todaysDate + '@engagingnetworks.online')


it('submits a single transaction with 3% cover fee with max 33%', (done) => {
    
    cy.visit(Cypress.env('test')+'page/13845/donate/1')
    cy.get('#en__field_supporter_emailAddress').clear().type(donationSingleFixed)
    cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
    cy.get('.en__field__item--other > .en__field__input').type('100.99')
    cy.get('button').click()
    cy.get('#dd-input').type('Lending')
    cy.get('#dtd-selected-company-1').contains('Lending Tree').click()
    //cy.get('iframe[name*="__privateStripeFrame"]').eq(0).click()
    // context('Actions', () => {
       // cy.get('[name="__privateStripeFrame4535"]').click()


      // cy.waitForStripeIdealIframe().find('li').type("{downarrow}").type("{enter}")

      // cy.waitForStripeIdealIframe().find('li:eq(0)').then(()=>{
      //  $elm => $elm[0].setAttribute('selected', "selected").should('be.visible').type('{enter}')
        
       // .trigger('enter',  { position: 'center' }).trigger('click', { force: true })
        //cy.contains('li#bank-list-item-0').select({force: true})
        cy.waitForStripeIdealIframe().find('[id="bank-list-item-0"]').click().then(x => {
          // Only here if click succeeds (so test fails)
          cy.isNotActionable('button', done)
          done(new Error('Expected button NOT to be clickable, but click() succeeded'));
          })
       
       // cy.isNotActionable('button', done)
          // cy.get('[id="bank-list-item-0"]').click().then(x => {
          // // Only here if click succeeds (so test fails)
          // done(new Error('Expected button NOT to be clickable, but click() succeeded'));
          // })
      
      
      //find('[id="bank-list-item-0"]').clcik()
        //  cy.waitForStripeIdealIframe().find('[id="bank-list-item-0"]').click().then(x => {
        //   done(new Error('Expected element NOT to be clickable, but click() succeeded'))
        //   cy.isNotActionable('button', done)
        // })
        
      
     // cy.waitForStripeIdealIframe().find('li').then(els => {
        //const buttons = [...els];
        //cy.wrap(buttons[0]).
       // els.dropdown('toggle')
        //expect(isVisible(els[0])).to.be.true.click()
       // .should('be.visible').trigger('click').click()
    
       // cy.wrap(buttons[1]).click()
     
    //  })

      //  cy.waitForStripeIdealIframe().find('ul').each(($el,index,$list) => {  
      //   let option = $el.find('[id="bank-list-item-0"]').clcik()

      //  })
       // $el.click()
    
        // if(option=='ABN Amro')
        // $el.find('id').trigger('click')
        // {                
          
        // }

        // cy.waitForStripeIdealIframe().find('li:eq(0)')
        // .then($elm => $elm[0].setAttribute('selected', "selected")).type("{keydown}").trigger('{enter}')


        // .type('{downarrow}', { which: 1})
        // .type("{downarrow}")
        // .type("{enter}")
        //.type('{downarrow}', { release: false }).get('li:first').click()
        
        //.then($elm => $elm[0].setAttribute('selected', "selected").type('{enter}', {force: true})
        // .trigger('click')
        //cy.typeTab()
        //cy.get('button').click()
       // .then($elm => $elm.get(1).setAttribute('selected', "selected"))
        //.find('[id="bank-list-item-0"]')
        //cy.get('li').eq(0).trigger('click')
        //.should('include.text', 'ABN Amro')
        // .within(()=>{
        // cy.get('li').eq(0).select({force: true})
        // })
       //.then(element => cy.wrap(element).next().click({ position: 'center' }, {force: true}))
    })

})