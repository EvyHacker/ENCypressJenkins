Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('WS', ()=> {
  const user = 'Nel1';
  const username = 'napplicant';
  const password = 'P@ssw0rd0303'

  beforeEach(()=>{
    //...must login 1st - command is in support folder
    cy.login(username,password);
  
  })
   it('Create WS, open SF424 form and expand all', () => {

      const FON =     'PTS-NM-20200227-RR';//'SF424-11-15' 'SF424-RR-11-15' 
      const Package = 'PTS-NM-20200227-RR';//'SF424 Package' 'R&R Package'
      const WSname =  '05032020 Nel RR';//
      const Org =     'NET VISION CONSULTANTS, INC';//'FRENCH OIL MILL MACHINERY COMPANY, THE'

      cy.contains(user).should('be.visible');//assertion - also to be parametarized
      cy.contains(user).click();  
      cy.contains('My Workspaces').click();
      cy.url().should('include','/applicants');
      cy.contains('Create Workspace').click();
      cy.get('#fon').click();
      cy.get('#fon').type(FON);
      cy.get('#appName').click();
      cy.get('#oppPackageListOptions').select(Package);
      cy.get('#appName').type(WSname); 
      cy.contains('Link to an Organization').click();
      cy.contains(Org).click();
      cy.get('#createWorkspaceBtn').click()
      cy.wait(1000)
      cy.get('#createWorkspaceButn').should('not.exist');
      cy.contains('Success!', {timeout:10000});
      cy.get('app-applicants-side-nav > a:nth-child(2)').click().should('contain', 'Forms'); //unable to locate Forms link differently
      //complete SF424 (R&R) form
      cy.contains('SF424 (R & R) [V2.0]').click();//parametarize
      cy.wait(5000) //TODO: this is to allow for all sections to appear so that expand all expands all sections. need to be changed so that we wait for actual last object only.
      cy.contains('Expand All').click().should('have.class', 'not-active');
      
      //fill in data
      cy.get('[id="\'typeofsubmission\'\'preApplication\'"]').check({force: true});
      cy.get('#fieldset5LegalName').type('5LegalName');
      cy.get('#streetName1fieldset5Address1').type('3400 Columbia Pike');
      cy.get('#cityfieldset5Address1').type('Arlington');
      cy.get('#stateProvincefieldset5Address1').type('Virginia');
      cy.get('#countryfieldset5Address1').type('United States');
      cy.get('#countyfieldset5Address1').click();
      cy.get('#countyfieldset5Address1').type('Arlington County');
      cy.get('#zipCodefieldset5Address1').type('22204-4216');
      cy.get('#fieldset5NamefirstName').type('5FirstName');
      cy.get('#fieldset5NamelastName').type('5LastName');
      cy.get('#streetName1fieldset5Address2').type('3400 Columbia Pike');
      cy.get('#cityfieldset5Address2').type('Arlington');
      cy.get('#stateProvincefieldset5Address2').type('Virginia');
      cy.get('#countryfieldset5Address2').type('United States');
      cy.get('#countyfieldset5Address2').click();
      cy.get('#countyfieldset5Address2').type('Arlington County');
      cy.get('#zipCodefieldset5Address2').type('22204-4216');
      cy.get('#fieldset5PhoneNumber').type('(123) 456-7890');
      cy.get('#fieldset5Email').type('test@test.com');	
      cy.get('#fieldset6Employeridentificationeinortin').type('11-1111111');
      cy.get('#fieldset7Typeofapplicant').select('aStateGovernment');
      //cy.get('[typeofsubmission\'\'application').type('11-1111111');
      cy.get('[id="\'fieldset8Typeofapplication\'\'new\'"]').click({force: true});
      cy.get('[id="\'fieldset8FieldsetIsthisapplicationbeingsubmittedtootheragencies\'\'no\'"]').click({force: true});
      cy.get('#fieldset11Descriptivetitleofapplicantsproject').type('11DescriptiveTitleofApplicantsProject(required)');
      cy.get('#fieldset12DateRangestart .btnpicker').click();
      cy.get('tr:nth-child(3) > .daycell:nth-child(4) span').click();
      cy.get('#fieldset12DateRangeend .btnpicker').click();
      cy.get('tr:nth-child(5) > .daycell:nth-child(6) span').click();
      cy.get('#fieldset13Congressionaldistrictofapplicant').type('CA-012');
     
      cy.get('#fieldset16NamefirstName').type('14FirstName');
      cy.get('#fieldset16NamelastName').type('14LastName');
      cy.get('#fieldset16PhoneNumber').type('1-(141)414-1414');
      cy.get('#fieldset16Email').type('14@test.ca');
      cy.get('#fieldset17ATotalFederalFundsRequested').type('17');
      cy.get('#fieldset17BTotalNonFederalFunds').type('171');
      cy.get('#fieldset17CTotalFederalNonFederalFunds').type('1717');
      cy.get('#fieldset17DEstimatedProgramIncome').type('177171');
      cy.get('#fieldset14Iagreeundefined').check({force: true});
      cy.get('[id="\'fieldset18Isapplicationsubjecttoreviewbystateexecutiveorder12372Process\'\'bNo\'"]').click({force: true});
      cy.get('[id="\'fieldset18IfNo\'\'programHasNotBeenSelectedByStateForReview\'"]').click({force: true});
      cy.get('#fieldset19NamefirstName').type('19FirstName');
      cy.get('#fieldset19NamelastName').type('19LastName');
      cy.get('#fieldset19PositionTitle').type('19PositionTitle');
      cy.get('#fieldset19PhoneNumber').type('(191)919-1919 ext.1919');
      cy.get('#fieldset19Email').type('19@test.com');
      
      cy.get('.usa-button-secondary-inverse:nth-child(1)').click();//Save button
      cy.get('.usa-button-secondary-inverse:nth-child(3)').click();//Close button
      cy.contains('Unlock & Exit').click();
})

  })


