/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

describe('test redirect links when conditions are met', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY_HH_mm')
    const tomorrowsDate = Cypress.moment().add(1, 'day').format('MM/DD/YYYY_HH_mm')
    const iatsRedirect = ('en_iats_redirect_' + todaysDate + '@engagingnetworks.online')
    

    beforeEach(() => {
        cy.visit(Cypress.env('dallas')+'page/20483/donate/1')
      })

    it('it redirects to https://example.cypress.io/commands/location when supporter is new', () =>{


        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://example.cypress.io/commands/location')


    })

    it('redirects to https://politicalnetworks.com/page/12817/hub/1?chain when lastName contains test', () =>{

        cy.get('#en__field_supporter_lastName').clear().type('I can do testing')
        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://politicalnetworks.com/page/12817/hub/1?chain')
    })

    it('redirects to https://speca.io/engagingnetworks/engaging-network-services?key=726cda99f0551ef286486bb847f5fb5d when firstName = IATS1', () =>{

        cy.get('#en__field_supporter_firstName').clear().type('IATS1')
        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://speca.io/engagingnetworks/engaging-network-services?key=726cda99f0551ef286486bb847f5fb5d')
})

    it('redirects to https://internal.e-activist.com/page/59116/petition/1?chain when donationAmount = 50', () =>{

        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__input').eq(1).type('50.00')
        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://internal.e-activist.com/page/59116/petition/1?chain')
  
    })

    it('redirects to https://www.baeldung.com/integration-testing-a-rest-api when other1 = 10', () =>{
        
        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://www.baeldung.com/integration-testing-a-rest-api')

  
    })

    it('redirects to https://politicalnetworks.com/page/13230/petition/1?ea.tracking.id=sf_testing when other2 = 12', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10.00')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://politicalnetworks.com/page/13230/petition/1?ea.tracking.id=sf_testing')
  
    })

    it('redirects to https://golang.org/ when recurring donation is submitted', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay0').check()
        cy.get('#en__field_transaction_recurrstart').type(tomorrowsDate)
        cy.get('#en__field_transaction_recurrfreq').type('DAILY')
        cy.get('#en__field_transaction_othamt1').type('10')
        cy.get('#en__field_transaction_othamt2').type('12')
        cy.get('button').click()
        cy.url().should('eq', 'https://golang.org/')
  
    })

    it('redirects to https://esqa.moneris.com/mpg/index.php when donationAmount > 125', () =>{

        cy.get('#en__field_transaction_donationAmt').select('Other').should('have.value', 'Other')
        cy.get('.en__field__input').eq(1).type('150.00')
        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10.00')
        cy.get('#en__field_transaction_othamt2').type('12.00')
        cy.get('button').click()
        cy.url().should('eq', 'https://esqa.moneris.com/mpg/index.php')

  
    })

    it('redirects to fallback url https://www.iatspayments.com/login/login.asp', () =>{

        cy.get('#en__field_supporter_emailAddress').clear().type(iatsRedirect)
        cy.get('#en__field_transaction_recurrpay1').check()
        cy.get('#en__field_transaction_othamt1').type('10.00')
        cy.get('#en__field_transaction_othamt2').type('12.00')
        cy.get('button').click()
        cy.url().should('eq', 'https://www.iatspayments.com/login/login.asp')
  
    })

})

