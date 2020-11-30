/// <reference types="Cypress" />

describe('test Custom target DB default information', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailDefault = ('pb_ACI_Error_' + todaysDate + '@tellamazingstories.com')

    beforeEach(() => {
        cy.visit(Cypress.env('test')+'page/12988/donate/1')
      })

    it('throws an error', () =>{

        cy.get('#en__field_supporter_title').select('Ms.')
        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/12988/donate/2')
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_creditCardHolderName').type('Test')
        cy.get('#en__field_transaction_ccnumber').type('4120300909000003')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2020')
        cy.get('#en__field_transaction_ccvv').type('111')
        cy.get('button').click()

    })
    it('throws an error#2', () =>{

        cy.get('#en__field_supporter_title').select('Ms.')
        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/12988/donate/2')
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_creditCardHolderName').type('Test')
        cy.get('#en__field_transaction_ccnumber').type('4120300909000003')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2020')
        cy.get('#en__field_transaction_ccvv').type('111')
        cy.get('button').click()

    })

    it('throws an error#3', () =>{

        cy.get('#en__field_supporter_title').select('Ms.')
        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/12988/donate/2')
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_creditCardHolderName').type('Test')
        cy.get('#en__field_transaction_ccnumber').type('4120300909000003')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2020')
        cy.get('#en__field_transaction_ccvv').type('111')
        cy.get('button').click()

    })

    it('throws an error#4', () =>{

        cy.get('#en__field_supporter_title').select('Ms.')
        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/12988/donate/2')
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_creditCardHolderName').type('Test')
        cy.get('#en__field_transaction_ccnumber').type('4120300909000003')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2020')
        cy.get('#en__field_transaction_ccvv').type('111')
        cy.get('button').click()

    })

    it('throws an error#5', () =>{

        cy.get('#en__field_supporter_title').select('Ms.')
        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/12988/donate/2')
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('06888')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('#en__field_supporter_creditCardHolderName').type('Test')
        cy.get('#en__field_transaction_ccnumber').type('4120300909000003')
        cy.get('#en__field_transaction_ccexpire').type('10')
        cy.get(':nth-child(3) > .en__field__input').type('2020')
        cy.get('#en__field_transaction_ccvv').type('111')
        cy.get('button').click()

    })
})