//Submit the refund and validate 
          cy.get('.gadget__singleDonations__donation__type')
           .each((elm) => {
             cy.wrap(elm).invoke('text').then((type) => {
                if(type.trim()===('fcs')){
              cy.wrap(elm).click()
              cy.get('.refund').click()
              cy.get('.gadget__receipt > p').invoke('text').should('have', 'Amount Charged: 100.99 USD')
              cy.get('#refund__amount').type('85.99')
              cy.get('.gadget__receipt__field__input__receipt').select('Refund receipt').should('have.value', '604' )
              cy.get('.gadget__receipt__field__input__template').select('Refund template cypress').should('have.value', '3')
              cy.get('.gadget__receipt__buttons__send').click()
              cy.get('.message__actions__confirm').click()
              cy.wait(5000)
              cy.get('.gadget__singleDonations__donation__type')
             .each((refund) => {
              cy.wrap(refund).invoke('text').then((type) => {
                if(type.trim()===('rfd')){
                cy.wrap(elm).click()
                cy.get(':nth-child(3) > .gadget__singleDonations__transaction__value').should('have.text', '-85.99 USD')
                }
             })
            })
              }
             })
           })
            // cy.get('.gadget__singleDonations__donation__type').first().click()
          //     if(cy.get('.refund').should('be.visible')){
          //        cy.get('.refund').click()
          //     }else{
          //       cy.get('.gadget__singleDonations__donation__type').second().click()
          //       cy.get('.refund').click()
          //     }

        //   cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
        //     expect(text.trim()).contains('fcs')
        // })
        // cy.get('.gadget__singleDonations__donation__type').invoke('text')
        // .then((transType) => {
        //     if(expect(transType.trim()).contains('fcs')){
        //       cy.get(transType).click()
        //     }else{
        //       cy.get('.gadget__singleDonations__donation__type').second().click()
        //     }
                