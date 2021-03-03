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

describe('test Custom target DB default information', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailDefault = ('pb_PostalTargetBio_' + todaysDate + '@engagingnetworks.online')

    it('has correct default data', () =>{

        cy.visit(Cypress.env('test')+'page/13117/action/1')

        cy.get('#en__field_supporter_firstName').type('Custom Target')
        cy.get('#en__field_supporter_lastName').type('Bio')
        cy.get('#en__field_supporter_emailAddress').type(emailDefault)
        cy.get('#en__field_supporter_address1').type('address1')
        cy.get('#en__field_supporter_city').type('Tribeca')
        cy.get('#en__field_supporter_region').select('NY')
        cy.get('#en__field_supporter_postcode').type('D123AA')
        cy.get('#en__field_supporter_country').select('US')
        cy.get('button').click()

        // Validate Contact Details for first target
        cy.location('pathname').should('include', '/page/13117/action/2')
        cy.get('.en__contact--12072 > .en__contact__detail > .en__contactDetails').invoke('text').as('contactDetails')
        cy.get('@contactDetails').should('include', 'Contact Data Salutation: Dear Ms Shinkar,')
        cy.get('@contactDetails').should('include', 'Contact Data Organization: Engaging Networks')
        cy.get('@contactDetails').should('include', 'Contact Data Position Held:')
        cy.get('@contactDetails').should('include', 'Contact Data Title: Ms')
        cy.get('@contactDetails').should('include', 'Contact Data First Name: Priyanka')
        cy.get('@contactDetails').should('include', 'Contact Data Last Nam: Shinkar')
        cy.get('@contactDetails').should('include', 'Contact Data Suffix:')
        cy.get('@contactDetails').should('include', 'Contact Data fax number:')
        cy.get('@contactDetails').should('include', 'Contact Data address1: House of Commons')
        cy.get('@contactDetails').should('include', 'Contact Data address2:')
        cy.get('@contactDetails').should('include', 'Contact Data address3:')
        cy.get('@contactDetails').should('include', 'Contact Data city: - London')
        cy.get('@contactDetails').should('include', 'Contact Data region:')
        cy.get('@contactDetails').then((text) => {
                        expect(text.trim()).contains('United Kingdom')
                    })
        cy.get('@contactDetails').should('include', 'Contact Data party image: -')
        cy.get('@contactDetails').should('include', 'Contact Data bio1:')
        cy.get('@contactDetails').should('include', 'Contact Data bio2:')
        cy.get('@contactDetails').should('include', 'Contact Data twitter handle: null')
        cy.get('@contactDetails').should('include', 'Contact Data bio4:')
        cy.get('@contactDetails').should('include', 'Contact Data bio5:')
        cy.get('@contactDetails').should('include', 'Contact Data bio6:')
        cy.get('@contactDetails').should('include', 'Contact Data bio7:')
        cy.get('@contactDetails').should('include', 'EN Party ')

        cy.get('.en__contact--12072 > .en__contact__detail > .en__contactMessage').invoke('text').should('contain', 'Dear Ms Shinkar,')
        .and('include', 'My message to Priyanka Shinkar').and('include', 'Message (default): ETT_41 Postal target bio info')
        .and('include', 'Kind regards,').and('include', 'Custom Target Bio')
        
        // Validate Contact Details for second target
        cy.get('.en__contact--11745 > .en__contact__detail > .en__contactDetails').invoke('text').as('secondContactDetails')
        cy.get('@secondContactDetails').should('include', 'Contact Data Salutation: Dear Mr Szymczak,')
        cy.get('@secondContactDetails').should('include', 'Contact Data Organization: Engaging Networks')
        cy.get('@secondContactDetails').should('include', 'Contact Data Position Held:')
        cy.get('@secondContactDetails').should('include', 'Contact Data Title: Mr')
        cy.get('@secondContactDetails').should('include', 'Contact Data First Name: Dan')
        cy.get('@secondContactDetails').should('include', 'Contact Data Last Nam: Szymczak')
        cy.get('@secondContactDetails').should('include', 'Contact Data Suffix:')
        cy.get('@secondContactDetails').should('include', 'Contact Data fax number:')
        cy.get('@secondContactDetails').should('include', 'Contact Data address1: House of Commons')
        cy.get('@secondContactDetails').should('include', 'Contact Data address2:')
        cy.get('@secondContactDetails').should('include', 'Contact Data address3:')
        cy.get('@secondContactDetails').should('include', 'Contact Data city: - London')
        cy.get('@secondContactDetails').should('include', 'Contact Data region:')
        cy.get('@secondContactDetails').then((text) => {
                        expect(text.trim()).contains('United Kingdom')
                    })
        cy.get('@secondContactDetails').should('include', 'Contact Data party image: -')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio1:')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio2:')
        cy.get('@secondContactDetails').should('include', 'Contact Data twitter handle: null')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio4:')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio5:')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio6:')
        cy.get('@secondContactDetails').should('include', 'Contact Data bio7:')
        cy.get('@secondContactDetails').should('include', 'EN Party ')    
        cy.get('.en__contact--12072 > .en__contact__toggle').click()        
        cy.get('.en__contact--11745 > .en__contact__toggle').click()
        cy.get('.en__contact--15511 > .en__contact__toggle').click()
        cy.get('.en__contact--11745 > .en__contact__detail > .en__contactMessage > .en__field').invoke('text')
        .should('contain', 'Dear Mr Szymczak,').and('include', 'My message to Dan Szymczak')
        .and('include', 'Message (default): ETT_41 Postal target bio info').and('include', 'Kind regards,')
        .and('include', 'Custom Target Bio')

        // Validate Contact Details for third target
        cy.get('.en__contact--15511 > .en__contact__detail > .en__contactDetails').invoke('text').as('thirdContactDetails')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Salutation: Hi there!')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Organization: Engaging Networks')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Position Held: Test engineer')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Title: Mrs')
        cy.get('@thirdContactDetails').should('include', 'Contact Data First Name: Evy')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Last Nam: Gaidarenko')
        cy.get('@thirdContactDetails').should('include', 'Contact Data Suffix: V')
        cy.get('@thirdContactDetails').should('include', 'Contact Data fax number: 202-201-2233')
        cy.get('@thirdContactDetails').should('include', 'Contact Data address1: 1234 Test Street')
        cy.get('@thirdContactDetails').should('include', 'Apt 222')
        cy.get('@thirdContactDetails').should('include', 'Contact Data address3:')
        cy.get('@thirdContactDetails').should('include', 'Contact Data city: - Mclean')
        cy.get('@thirdContactDetails').should('include', 'Contact Data region: VA')
        cy.get('@thirdContactDetails').then((text) => {
                        expect(text.trim()).contains('United Kingdom')
                    })
        cy.get('@thirdContactDetails').should('include', 'Contact Data party image: - null')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio1: Biography 1 Testing this story')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio2:  Biography 2 It should work')
        cy.get('@thirdContactDetails').should('include', 'Contact Data twitter handle: Biography 3 You are almost there')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio4:  Biography 4 You can see this')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio5:  Biography 5 And this')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio6: Biography 6 We can do this')
        cy.get('@thirdContactDetails').should('include', 'Contact Data bio7:  Biography 7 !@#$%^')
        cy.get('@thirdContactDetails').should('include', 'Contact Data party:  Biography 8 And now it is time to party')   

        cy.get('.en__contact--15511 > .en__contact__detail > .en__contactMessage > .en__field').invoke('text')
        .should('contain', 'Hi there!').and('include', 'My message to Evy Gaidarenko')
        .and('include', 'Message (default): ETT_41 Postal target bio info').and('include', 'Kind regards,')
        .and('include', 'Custom Target Bio')

        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13117/action/3')   
        cy.get('.en__component--column').invoke('text').as('thankyouPage')   
        cy.get('@thankyouPage').should('include', 'First Name: Custom Target')
        cy.get('@thankyouPage').should('include', 'Last Name: Bio')
        cy.get('@thankyouPage').should('include', 'Email Address: ' + emailDefault.toLowerCase())
        cy.get('@thankyouPage').should('include', 'Country: US')

    })
})

describe('test Custom target DB default information', ()=>{
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