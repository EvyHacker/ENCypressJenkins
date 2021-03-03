/// <reference types="Cypress" />

describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_ecomm_toronto_' + todaysDate + '@engagingnetworks.online')
  
  beforeEach(() => {
    cy.visit(Cypress.env('toronto')+'page/49603/shop/1')
  })

    it('can add product to the cart and complete the transaction', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__button').click()
        cy.wait(2000)
        //cy.get('.en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').find('a').should('include.text', 'Cart').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary__row > .en__productSummary__item--total').contains('$9.00')
        cy.get('.en__component--eccheckout__subtotal > h3').contains('Sub-total $9.00')
        cy.get('.en__component--eccheckout__submit').click()

        PersonalInfo()
        cy.get('.en__productSummary__item--description > h3').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__productSummary__item--description__optionNames').should('have.text', 'Seagreass Cactus')
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$9.00')
        cy.get('button').click()

        AddCCInfo()
        cy.get('.en__productSummary__item--description > h3').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__productSummary__item--description__optionNames').should('have.text', 'Seagreass Cactus')
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$9.00')
        
        AddPersonalMessageEmail()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$9.00')     

    })

    it('can add multiple products to the cart and complete the transaction', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__product__optionType > select').select('Coral Cactus').should('have.value', 'Coral Cactus')
        cy.wait(3000)
        cy.get('.en__button').click()
        cy.get('.en__product__optionType > select').select('Moon Cactus').should('have.value', 'Moon Cactus')
        cy.wait(3000)
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary__item--description > p').as('productCart')
        cy.get('@productCart').contains('Seagreass Cactus')
        cy.get('@productCart').contains('Coral Cactus')
        cy.get('@productCart').contains('Moon Cactus')
        cy.get('.en__productSummary__item--price > .en__price').contains('$9.00')
        cy.get('.en__productSummary__item--total > .en__price').contains('$9.00')
        cy.get('.en__component--eccheckout__subtotal > h3').contains('Sub-total $27.00')
        cy.get('.en__component--eccheckout__submit').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Seagreass Cactus')
        cy.get('@orderTotal').contains('Coral Cactus')
        cy.get('@orderTotal').contains('Moon Cactus')
        cy.get('@orderTotal').contains('$9.00')
        cy.get('@orderTotal').contains('$27.00')
        cy.get('button').click()

        AddPersonalMessageEmail()
        AddPersonalMessageCard()
        cy.get('#en__field__method20').select('NONE').should('have.value', 'NONE')

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$27.00')     

    })

    it('can apply promo code to the total', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__quantity__control--add').dblclick()
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary__item--total > .en__price').should('have.text', '$27.00')
        cy.get('#ecpromo').type('10DISC')
        cy.get('button').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Seagreass Cactus')
        cy.get('@orderTotal').contains('10DISC')
        cy.get('@orderTotal').contains('-10%')
        cy.get('@orderTotal').contains('$24.30')
        cy.get('@orderTotal').contains('$24.30')
        cy.get('button').click()

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$24.30')    

    })

    it('can increase contribution amount', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__quantity__control--add').dblclick()
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary__item--total > .en__price').should('have.text', '$27.00')
        cy.get('#en__field__input--radio--10').check()
        cy.get('button').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Seagreass Cactus')
        cy.get('@orderTotal').contains('$27.00')
        cy.get('@orderTotal').contains('$10.00')
        cy.get('@orderTotal').contains('$37.00')
        cy.get('button').click()

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$37.00')    
        
    })

    it('can increase custom contribution amount', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__product__optionType > select').select('Coral Cactus').should('have.value', 'Coral Cactus')
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary').as('productSummary')
        cy.get('@productSummary').contains('Coral Cactus')
        cy.get('@productSummary').contains('$9.00')
        cy.get('@productSummary').contains('$18.00')
        cy.get('#en__field__input--radio--other').check()
        cy.get('.en__field__item--other > .en__field__input').type('1000.00')
        cy.get('button').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Coral Cactus')
        cy.get('@orderTotal').contains('$18.00')
        cy.get('@orderTotal').contains('$1,000.00')
        cy.get('@orderTotal').contains('$1,018.00')
        cy.get('button').click()

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$1018.00')  

    })

    it('can increase custom contribution amount and add promo code', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__product__optionType > select').select('Coral Cactus').should('have.value', 'Coral Cactus')
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary').as('productSummary')
        cy.get('@productSummary').contains('Coral Cactus')
        cy.get('@productSummary').contains('$9.00')
        cy.get('@productSummary').contains('$18.00')
        cy.get('#ecpromo').type('10DISC')
        cy.get('#en__field__input--radio--other').check()
        cy.get('.en__field__item--other > .en__field__input').type('100.00')
        cy.get('button').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Coral Cactus')
        cy.get('@orderTotal').contains('10DISC')
        cy.get('@orderTotal').contains('-10%')
        cy.get('@orderTotal').contains('$16.20')
        cy.get('@orderTotal').contains('$100.00')
        cy.get('@orderTotal').contains('$116.20')
        cy.get('button').click()

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$116.20')  

    })

    it('can add and remove items from the cart', () => {

        cy.get('.en__product__image').click()

        cy.location('pathname').should('include', '/page/49603/shop/3')
        cy.get('.en__product__name').should('have.text', 'Symbolic Gifts - Cactus')
        cy.get('.en__price').should('include.text', '$9.00')
        cy.get('.en__product__optionType > select').select('Moon Cactus').should('have.value', 'Moon Cactus')
        cy.get('.en__quantity__control--add').dblclick()
        cy.get('.en__button').click()
        cy.wait(3000)
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > :nth-child(1)').click()

        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__productSummary').as('productSummary')
        cy.get('@productSummary').contains('Moon Cactus')
        cy.get('@productSummary').contains('$9.00')
        cy.get('@productSummary').contains('$27.00')
        cy.get('.en__quantity__control--subtract').click()
        cy.get('@productSummary').contains('Moon Cactus')
        cy.get('@productSummary').contains('$9.00')
        cy.get('@productSummary').contains('$18.00')
        cy.wait(2000)
        cy.get('button').click()

        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Moon Cactus')
        cy.get('@orderTotal').contains('2 x $9.00')
        cy.get('@orderTotal').contains('$18.00')
        cy.get('@orderTotal').contains('$0.00')
        cy.get('@orderTotal').contains('$18.00')

        cy.go('back')
        cy.location('pathname').should('include', '/page/49603/shop/4')
        cy.get('.en__quantity__control--add').dblclick()
        cy.wait(2000)
        cy.get('button').click()

        PersonalInfo()
        cy.get('.en__component--row > :nth-child(2)').as('orderTotal')
        cy.get('@orderTotal').contains('Moon Cactus')
        cy.get('@orderTotal').contains('4 x $9.00')
        cy.get('@orderTotal').contains('$36.00')
        cy.get('@orderTotal').contains('$0.00')
        cy.get('@orderTotal').contains('$36.00')
        cy.get('button').click()

        AddCCInfo()
        cy.get('button').click()

        ValidateThankYouPage()
        cy.get(':nth-child(24)').contains('$36.00') 

    })

    function PersonalInfo(){

        cy.location('pathname').should('include', '/page/49603/shop/5')
        cy.get('#en__field_supporter_firstName').type('Evy')
        cy.get('#en__field_supporter_lastName').type('Ecomm')
        cy.get('#en__field_supporter_emailAddress').type(email)
        cy.get('#en__field_supporter_address1').type('add1')
        cy.get('#en__field_supporter_address2').type('add2')
        cy.get('#en__field_supporter_postcode').type('11112')
        cy.get('#en__field_supporter_city').type('city')
        cy.get('#en__field_supporter_region').select('VA')
        cy.get('#en__field_supporter_country').select('USA')

    }

    function AddCCInfo(){

        cy.location('pathname').should('include', '/page/49603/shop/6')
        cy.get('#en__field_transaction_paymenttype').select('Visa').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').type('ST Ecomm CC Name')
        cy.get('#en__field_transaction_ccnumber').type('4222222222222220')
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field__element > :nth-child(3) > .en__field__input').type('2023')
        cy.get('#en__field_transaction_ccvv').type('123')

    }

    function AddPersonalMessageEmail(){

        cy.get('#en__field__message00').type('This is test email')
        cy.get('#en__field__firstName00').type('Evy')
        cy.get('#en__field__lastName00').type('Test')
        cy.get('#en__field__emailAddress00').type('evy@engagingnetworks.net')
        cy.get('#en__field__schedule00').type('2020-01-01')
        
    }

    function AddPersonalMessageCard(){

        cy.get('#en__field__method10').select('POSTCARD').should('have.value', 'POSTCARD')
        cy.get('#en__field__message10').type('This is test card')
        cy.get('#en__field__firstName10').type('Evy')
        cy.get('#en__field__lastName10').type('Test')
        cy.get('#en__field__address110').type('1 Hilltop')
        cy.get('#en__field__city10').type('Baltimore')
        cy.get('#en__field__region10').type('Maryland')
        cy.get('#en__field__postCode10').type('20123')
        cy.get('#en__field__country10').type('USA')
    
    }

    function ValidateThankYouPage(){

        cy.location('pathname').should('include', '/page/49603/shop/7')
        cy.get(':nth-child(5) > .en__component--column > .en__component').as('thankyoucopy')
        cy.get('@thankyoucopy').contains('Evy')
        cy.get('@thankyoucopy').contains('Ecomm')
        cy.get('@thankyoucopy').contains('add1')
        cy.get('@thankyoucopy').contains('city')
        cy.get('@thankyoucopy').contains('VA')
        cy.get('@thankyoucopy').contains(email)
        cy.get('@thankyoucopy').contains('11112')
        cy.get('@thankyoucopy').contains('USA')
        cy.get('@thankyoucopy').contains('159834')   
        cy.get('@thankyoucopy').contains('CREDIT_SINGLE')     
        cy.get('@thankyoucopy').contains('USD')
        cy.get('@thankyoucopy').contains('IATS North America')
        cy.get('@thankyoucopy').contains('VISA')   
        
    }
})
describe('test e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const email = ('st_ecomm_toronto_' + todaysDate + '@engagingnetworks.online')
      
     it('searches for the supporters single donation transaction', () => {
     
        logIn()
        cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
        .type(email)
        cy.get('.userInput__action > .button').click()
        cy.get('.icon--search--color').click()
        cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
          expect(text.trim()).contains('fcs')
          expect(text.trim()).contains('etm')
          logOut()
      })
    })
    function logIn(){
        cy.visit(Cypress.env('torontoLogIn')+'#login')


             cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
             cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
             cy.get('.button').click()
             
             if(cy.url().should('contains', '#login/tos')){
                cy.get('.enSandbox__tos__agree').click()
            }else{cy.visit(Cypress.env('torontoLogIn') + '#dashboard', {delay : 3000})}
    
        
      }
      function logOut(){
  
          cy.get('.dashboard__action--close').click()
          cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
          cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
          cy.url().should('contain','#login')
      }
    })