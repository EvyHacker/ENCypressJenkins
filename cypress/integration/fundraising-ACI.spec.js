/// <reference types="Cypress" />

context('Donate 12988', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('test')+'page/12988/donate/1')
  })

  it('starts with correct page 1 defaults', () => {
    cy.get('#en__field_transaction_donationAmt').select('10')
    cy.get('#en__field_supporter_title').select('Ms.')
    cy.get('#en__field_supporter_firstName').type('Evy')
    cy.get('#en__field_supporter_lastName').type('Tester')
    cy.get('#en__field_supporter_emailAddress').type('testid_aci@engagingnetworks.online')
    cy.get('button').click()

    cy.location('pathname').should('eq', '/page/12988/donate/2')
    
    fillPage2Form()
    cy.get('button').click()

    cy.location('pathname').should('eq', '/page/12988/donate/3')
    cy.get('.en__component--copyblock').as('finalpage')
    cy.get('@finalpage').contains('ID:').contains(/\s+/)
    cy.get('@finalpage').contains('3509')
    cy.get('@finalpage').contains('Campaigner ID:').contains(/\s+/)
    cy.get('.txnID > strong').contains('TXN ID:').contains(/\s+/)
    cy.get('@finalpage').contains('CREDIT_SINGLE')
    cy.get('@finalpage').contains('USD')
    cy.get('@finalpage').contains('IATS North America')
    cy.get('@finalpage').contains('$10.00')

    // cy.get('.en__component--copyblock p:first-child').invoke('text').then((text)=>{
    //     alert(text.replace('ID:- ', ''))
    
    // })

})
function fillPage2Form() {
    cy.get('#en__field_supporter_address1').type('1 Hilltop Rd')
    cy.get('#en__field_supporter_city').type('Baltimore')
    cy.get('#en__field_supporter_region').select('MD')
    cy.get('#en__field_supporter_postcode').type('20001')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_supporter_creditCardHolderName').type('Evy')
    cy.get('#en__field_transaction_ccnumber').type('4222222222222220')
    cy.get('#en__field_transaction_ccexpire').type('12')
    cy.get(':nth-child(3) > .en__field__input').type('2020')
    cy.get('#en__field_transaction_ccvv').type('123')
}
})
  

