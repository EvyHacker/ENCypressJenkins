/// <reference types="Cypress" />


// describe('test us.e-activist LogIn ', ()=>{

//   const todaysDate = Cypress.moment().format('MM_DD_YYYY')
//   const emailRecur = ('st_donationrecurringIATS_' + todaysDate + '@tellamazingstories.com')
//   const emailSingle = ('st_donationsingleIATS_' + todaysDate + '@tellamazingstories.com')
  
//     it('searches for the supporters recurring donation transaction', () => {
   
//         logIn()
//         cy.get('.enLayout__nav--main > :nth-child(1) > :nth-child(1)').click()
//         cy.get(':nth-child(1) > .enLayout__nav > ul > :nth-child(1) > a').click()
//         cy.get(':nth-child(2) > .enFolder__type').click()
//         cy.get('.pages__search').type('ST_Single Donation with One Click_ORIG')
//         cy.wait(3000)
//         cy.get('.pages__page__summary__item--dup > .pages__page__action').click()
//         cy.get('.pbo__input__text').clear().type('ST_Single Donation_2' + todaysDate)
//         cy.get('.pboDuplicate__action > .button').click()
//         cy.wait(3000)
//         cy.get('.pboPB__button--save').click()
//         cy.get('.button--done').click()
//         cy.get('.pboValidation__action--ok').click()

//         logOut()

//     })
//    function logIn(){
//         cy.visit('https://us.e-activist.com/index.html#login', {delay : 3000})
//         if(cy.location('pathname').should('have', 'index.html#login')){
//            cy.get('#enLoginUsername').type('evy@engagingnetworks.net')
//            cy.get('#enLoginPassword').type('EasyPass@1241')
//            cy.get('.button').click()
//     }else{cy.visit('https://us.e-activist.com/index.html#dashboard', {delay : 3000})
//       }
//     }
//     function logOut(){

//         cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
//         cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
//         cy.url().should('eq', 'https://us.e-activist.com/index.html#login')
//     }
//   })

describe('test Single donation IATS', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_donationrecurringIATS_' + todaysDate + '@tellamazingstories.com')

    it('can log in to email', () => {
        cy.visit('https://mail.hostedemail.com/?_task=mail&_mbox=INBOX')
        cy.get('#rcmloginuser').type('unittesting@tellamazingstories.com')
        cy.get('#rcmloginpwd').type('Kings1and2')
        cy.get('.button').click()
        cy.get('#mailsearchform').type('ST_Single Donation_2' + todaysDate)
    })
})