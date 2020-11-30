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
                
      cy.stub(win, 'open').as('windowOpen')
                  // change window location to be same as the popup url
                 

            })
            cy.get('@windowOpen').trigger('mouseover')
            cy.focus('@windowOpen').then(($dialog)=>{
                cy.wrap($dialog).find('button').find('span').contains("×").click()
                })
            //cy.window().its('fetch').should('be.visible')
          
   
        })
    })              
       
    
})
