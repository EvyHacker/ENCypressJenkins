Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('download PDF form', ()=> {
  const user = 'Nel1';
  const username = 'napplicant';
  const password = 'P@ssw0rd0303'

  beforeEach(()=>{
    //...must login 1st - command is in support folder
    cy.login(username,password);
  
  })
   it('Search WS and upload form', () => {

      const WSname  =  '04032020 Nel RR 409';
      const FormName    =  'SF424 (R & R) [V2.0]';
     // const fileName = 'RRWS2540-RR_SF424-V2.0.pdf';   
      const fileName = 'C:/Users/Nel Maniourova/Automation/ggtesting/cypress/fixtures/RRWS2540-RR_SF424-V2.0.pdf';   
     
      cy.contains(user).should('be.visible');
      cy.contains(user).click({timeout:50000});  
      cy.contains('My Workspaces').click();
      cy.get('#overview-extended-search-field-small').click();
      cy.get('#overview-extended-search-field-small').type(WSname);
      cy.get('.keep-low > button').click();
      cy.contains(WSname).click({timeout:500000});
      cy.get('app-applicants-side-nav > a:nth-child(2)').click({timeout:50000}).should('contain', 'Forms'); //unable to locate Forms link differently
       /*cy.contains(FormName).parent().get('#forms-menu').click();
      cy.get('#upload-button').click({force:true});
      
   cy.get('input[type="file"]', { force: true }) // Your target element here
      .attach_file(fileName) // Your file name here
      .trigger("change", { force: true });
      
      
         cy.fixture(fileName).then(fileContent => {
              cy.get('input[type="file"]',{force:true}).upload({ 
                fileContent, 
                fileName, 
                mimeType: 'application/pdf'
                //encoding: 'utf8'
              });
              
            });
           
     */

    cy.contains(FormName).click();//parametarize
    cy.wait(5000) //TODO: this is to allow for all sections to appear so that expand all expands all sections. need to be changed so that we wait for actual last object only.
    cy.contains('Expand All').click().should('have.class', 'not-active');
   cy.contains('Browse').click();
   cy.get('input[type="file"]', { force: true }).first().attach_file(fileName).trigger("change", { force: true });
})

  })


