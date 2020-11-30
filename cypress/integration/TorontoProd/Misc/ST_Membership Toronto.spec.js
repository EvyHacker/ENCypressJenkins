/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_memberships_' + todaysDate + '@tellamazingstories.com')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/49979/membership/1')
  })

    it('has correct data', () => {

        cy.get(':nth-child(1) > .en__memtype > .en__memtype__details')
        .should('include.text', 'Zero Membership').and('include.text', '$0 membership for one month')
        cy.get(':nth-child(2) > .en__memtype > .en__memtype__details')
        .should('include.text', 'Group Membership of 5').and('include.text', 'Group Membership Monthly')
        .and('include.text', '- this is a group membership with 5 members for one year')
        cy.get(':nth-child(3) > .en__memtype > .en__memtype__details')
        .should('include.text', 'Individual Membership').and('include.text', 'Individual Membership')
      })

    it('can sign up for 0 membership', () =>{

        cy.get(':nth-child(1) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector__item').should('include.text', '$0.00')

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/49979/membership/3')
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Zero Membership - 1 month')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$0.00')
        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get('.en__component > :nth-child(17)').contains('CASH')  
        cy.get(':nth-child(24)').contains('$0.00')
          
      })

    it('can sign up for group membership', () =>{

        cy.get(':nth-child(2) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector__item').should('include.text', '$5.00')

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

        AddCCInfo()
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Group Membership of 5 - 12 months')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$5.00')

        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('[data-memberindex="2"] > .en__member__row > .en__member__toggle').click()
        cy.get('#en__field_for--mem_member_1_firstName').type('Member #2')
        cy.get('#en__field_for--mem_member_1_lastName').type('Test Member 2')
        cy.get('[data-memberindex="3"] > .en__member__row > .en__member__toggle').click()
        cy.get('#en__field_for--mem_member_2_firstName').type('Member #3')
        cy.get('#en__field_for--mem_member_2_lastName').type('Test Member 3')
        cy.get('[data-memberindex="4"] > .en__member__row > .en__member__toggle').click()
        cy.get('#en__field_for--mem_member_3_firstName').type('Member #4')
        cy.get('#en__field_for--mem_member_3_lastName').type('Test Member 4')
        cy.get('[data-memberindex="5"] > .en__member__row > .en__member__toggle').click()
        cy.get('#en__field_for--mem_member_4_firstName').type('Member #5')
        cy.get('#en__field_for--mem_member_4_lastName').type('Test Member 5')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$5.00')
        cy.get(':nth-child(21)').contains('VISA')

    })

    it('can sign up for individual membership with 12 months option', () =>{

        cy.get(':nth-child(3) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector > :nth-child(1)').should('include.text', '$1.00')

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

         AddCCInfo()
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Individual Membership - 12 months')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$1.00')

        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$1.00')
        cy.get(':nth-child(21)').contains('VISA')

    })

    it('can sign up for individual membership with 24 months option', () =>{

        cy.get(':nth-child(3) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector > :nth-child(2)').click()

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('button').click()

         AddCCInfo()
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Individual Membership - 24 months')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$2.00')

        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$2.00')
        cy.get(':nth-child(21)').contains('VISA')

    })

    it('can sign up for individual membership with 36 months option and additional donation', () =>{

        cy.get(':nth-child(3) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector > :nth-child(3)').click()

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__component--memadditional__input--radio--10').check()
        cy.get('button').click()

         AddCCInfo()
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Individual Membership - 36 months')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$13.00')

        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$13.00')
        cy.get(':nth-child(21)').contains('VISA')

    })

    it('can sign up for individual membership with 48 months option and add promo code', () =>{

        cy.get(':nth-child(3) > .en__memtype > .en__memtype__details > .en__memactions > .en__button').click()
        cy.get('.en__memselector > :nth-child(4)').click()

        ValidateMembershipInfo()
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__component--mempromo__input').type("MEM10")
        cy.get('button').click()

         AddCCInfo()
        cy.get('.en__component--row--1 > .en__component--column').invoke('text').as('orderSummary')
        cy.get('@orderSummary').should('include', 'Individual Membership - 48 months')
        cy.get(':nth-child(1) > :nth-child(2) > .en__price').should('have.text', '$4.00')
        cy.get('.en__orderSummary__item--promo > :nth-child(2)').should('include.text', '-10%')
        cy.get('.en__orderSummary__item--subtotal > :nth-child(2) > .en__price').should('have.text', '$3.60')
        cy.get('.en__orderSummary__item--additional > :nth-child(2)').should('include.text', '$0.00')
        cy.get('.en__orderSummary__item--total > :nth-child(2) > .en__price').should('have.text', '$3.60')

        cy.get('#en__field_for--mem_member_0_firstName').type('Member #1')
        cy.get('#en__field_for--mem_member_0_lastName').type('Test Member')
        cy.get('.en__submit > button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$3.60')
        cy.get(':nth-child(21)').contains('VISA')

    })

      function ValidateMembershipInfo(){

        cy.location('pathname').should('include', '/page/49979/membership/2')
        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Memberships')
        cy.get('#en__field_supporter_emailAddress')
        .should('have.value', 'st_memberships@tellamazingstories.com')
        cy.get('#en__field_supporter_address1').should('have.value', 'add1')
        cy.get('#en__field_supporter_address2').should('have.value', 'add2')
        cy.get('#en__field_supporter_postcode').should('have.value', '12345')
        cy.get('#en__field_supporter_city').should('have.value', 'Brooklyn')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_country').should('have.value', 'USA')
      }

      function AddCCInfo(){

        cy.location('pathname').should('include', '/page/49979/membership/3')
        cy.get('#en__field_transaction_paymenttype').select('Visa').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value','4222222222222220')
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field__element > :nth-child(3) > .en__field__input').type('2023')
        cy.get('#en__field_transaction_ccvv').should('have.value','111')

    }

      function ValidateThankYouPage(){

        cy.location('pathname').should('include', '/page/49979/membership/4')
        cy.get('.en__component--column > .en__component').as('thankyoucopy')
        cy.get('@thankyoucopy').contains('ST')
        cy.get('@thankyoucopy').contains('Memberships')
        cy.get('@thankyoucopy').contains('add1')
        cy.get('@thankyoucopy').contains('Brooklyn')
        cy.get('@thankyoucopy').contains('NY')
        cy.get('@thankyoucopy').contains(email)
        cy.get('@thankyoucopy').contains('12345')
        cy.get('@thankyoucopy').contains('USA')
        cy.get('@thankyoucopy').contains('160528')   
        cy.get('@thankyoucopy').contains('USD')
        cy.get('@thankyoucopy').contains('IATS North America')
        
      }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_memberships_' + todaysDate + '@tellamazingstories.com')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('msp')
      })
      logOut()
    })
  
    function logIn(){
      cy.visit(Cypress.env('torontoLogIn')+'#login')

        if(cy.location('pathname').should('have', '#login')){
           cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
           cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
           cy.get('.button').click()
           if(cy.location('pathname').should('have', '#login/tos')){
              cy.get('.enSandbox__tos__agree').click()
          }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})}
    }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})
      }
    }
    function logOut(){

        cy.get('.dashboard__action--close').click()
        cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
        cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
        cy.url().should('contain','#login')
    }
  })