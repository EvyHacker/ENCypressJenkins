/// <reference types="Cypress" />

describe('test Custom target reference information', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailDefault = ('pb_CustomTargetDefault_' + todaysDate + '@engagingnetworks.online')

    it('has correct default data', () =>{

        cy.visit(Cypress.env('test')+'page/13118/action/1')

        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Default')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('D123AA')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13118/action/2')
        cy.get('.en__contactDetails__custom').invoke('text').as('contactDetails')
        cy.get('@contactDetails').should('include', 'Contact Data Salutation: Hi there!')
        cy.get('@contactDetails').should('include', 'Contact Data Organization: Engaging Networks')
        cy.get('@contactDetails').should('include', 'Contact Data Position Held: Test engineer')
        cy.get('@contactDetails').should('include', 'Contact Data Title: Mrs')
        cy.get('@contactDetails').should('include', 'Contact Data First Name: Evy')
        cy.get('@contactDetails').should('include', 'Contact Data Last Nam: Gaidarenko')
        cy.get('@contactDetails').should('include', 'Contact Data Suffix: V')
        cy.get('@contactDetails').should('include', 'Contact Data fax number: 202-201-2233')
        cy.get('@contactDetails').should('include', 'Contact Data address1: 1234 Test Street')
        cy.get('@contactDetails').should('include', 'Apt 222')
        cy.get('@contactDetails').should('include', 'Contact Data address3:')
        cy.get('@contactDetails').should('include', 'Contact Data city: - Mclean')
        cy.get('@contactDetails').should('include', 'Contact Data region: VA')
        cy.get('@contactDetails').then((text) => {
                        expect(text.trim()).contains('United Kingdom')
                    })
        cy.get('@contactDetails').should('include', 'Contact Data party image: - null')
        cy.get('@contactDetails').should('include', 'Contact Data bio1: Biography 1 Testing this story')
        cy.get('@contactDetails').should('include', 'Contact Data bio2:  Biography 2 It should work')
        cy.get('@contactDetails').should('include', 'Contact Data twitter handle: Biography 3 You are almost there')
        cy.get('@contactDetails').should('include', 'Contact Data bio4:  Biography 4 You can see this')
        cy.get('@contactDetails').should('include', 'Contact Data bio5:  Biography 5 And this')
        cy.get('@contactDetails').should('include', 'Contact Data bio6: Biography 6 We can do this')
        cy.get('@contactDetails').should('include', 'Contact Data bio7:  Biography 7 !@#$%^')
        cy.get('@contactDetails').should('include', 'Contact Data party:  Biography 8 And now it is time to party')   

        //Validate Refernce Data
        cy.get(':nth-child(26)').invoke('text').as('referenceDetails')
        cy.get('@referenceDetails').should('include', 'Reference 1 Test')
        cy.get('@referenceDetails').should('include', 'Reference 2 Test')
        cy.get('@referenceDetails').should('include', 'Reference 3 Test')
        cy.get('@referenceDetails').should('include', 'Reference 4 Test')
        cy.get('@referenceDetails').should('include', 'Reference 5 Test')
        cy.get('@referenceDetails').should('include', 'Reference 6 Test')
        cy.get('@referenceDetails').should('include', 'Reference 7 Test')
        cy.get('@referenceDetails').should('include', 'Reference 8 Test')
        cy.get('@referenceDetails').should('include', 'Reference 9 Test')
        cy.get('@referenceDetails').should('include', 'Reference 10 Test')

        //Validate target blovk               
        cy.get('.en__field__input').should('have.value', 'Subject (default): ETT_42 Custom target reference info')
        cy.get('.en__field').invoke('text').should('contain', 'Hi there!')

        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13118/action/3')   
        cy.get('.en__component--column').invoke('text').as('thankyouPage')   
        cy.get('@thankyouPage').should('include', 'First Name: Custom Target')
        cy.get('@thankyouPage').should('include', 'Last Name: Default')
        cy.get('@thankyouPage').should('include', 'Email Address: ' + emailDefault.toLowerCase())
        cy.get('@thankyouPage').should('include', 'Country: US')

    })
})