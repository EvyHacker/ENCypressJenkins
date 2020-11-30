Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
    beforeEach(() => {
        cy.visit(Cypress.env('mainGrantURL')) 
    })

    /*Validate banner links*/

    it('validates top menu items', () => {
        cy.get('#globalnav > ul').within(($lis) => {
            cy.get('li').eq(0).contains('Help').click()
            cy.window().then((win) => {
                cy.stub(win, 'open', url => {
                  // change window location to be same as the popup url
                  win.location.href = Cypress.config().mainGrantURL + url;
                  win.location.href.close()
                  //cy.request(href)
        // drill into the response body
        
                 // cy.url().should('contain','/help/index.htm');
                  //expect(win.location).to.include('/help/html/help/index.htm')
                //  win.location.href = Cypress.config().mainGrantURL + url;
                })
                
                //.as("popup") // alias it with popup, so we can wait refer it with @popup
                //expect('@popup').to.include('/help/html/help/index.htm')
               // cy.get('@popup').close
               // cy.get('@popup').should('have.title', 'Grants.gov Online Help')
                
              })
              
              // Click link which triggers javascript's window.open() call
              //cy.get('li').eq(0).contains('Help').click()
              
              // Make sure that it triggered window.open function call
              //cy.get("@popup").should("be.called")
             // cy.get('@popup').should('have.title', 'Grants.gov Online Help')
              
             //cy.stub(win, 'open').contains('Grants.gov Online Help')
                // cy.stub(win, 'open').as('windowOpen')
                // cy.get('@windowOpen').contains('Grants.gov Online Help')
             
             // cy.get('@windowOpen').should('include', 'www.grants.gov/help/html/help/index.htm')
            })
    })
})