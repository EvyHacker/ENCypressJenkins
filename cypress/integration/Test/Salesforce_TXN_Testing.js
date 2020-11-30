Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  describe('My First Test', function() {

    const todaysDate = Cypress.moment().format('MMMM_DD')
    const todaysTime = Cypress.moment().format('HH:mm')
    const todaysTimeEmail = Cypress.moment().format('HH.mm')
    const emailTxn = ('txn_' + todaysDate + '_' + todaysTimeEmail + '@noaddress.com')

    it('creates users every 5mins and submits PET txn' ,() => {
        cy.visit('https://politicalnetworks.com/page/13230/petition/1?ea.tracking.id=sf_testing')
        cy.get('#en__field_supporter_firstName').type('Txn ' + todaysDate)
        cy.get('#en__field_supporter_lastName').type('Push ' + todaysTime)
        cy.get('#en__field_supporter_emailAddress').type(emailTxn)
        cy.get('button').click()
    })
  })
