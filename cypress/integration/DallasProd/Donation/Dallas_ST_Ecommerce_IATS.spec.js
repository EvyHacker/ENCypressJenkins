/// <reference types="Cypress" />


describe('test Single and/or Recurring donation ', ()=>{
  const todaysDate = Cypress.moment().format('MM_DD_YYYY')
  const email = ('st_ecomm_' + todaysDate + '@engagingnetworks.online')

  beforeEach(() => {
    cy.visit(Cypress.env('dallas')+'page/13531/shop/1?mode=DEMO')
  })

    it('loads with correct page 1 content', () => {

        cy.get('h1').should('have.text', 'Feature an item or category')
        cy.get('.en__ecfeaturelist__header').should('have.text', 'Featured List')
        cy.get('.en__product__price').should('have.text', '$9.00')
        cy.get('.en__button').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/page/13531/shop/3?productId=310&name=Avengers')
          })
      
      })

      it('adds product to the cart', () => {
    
        cy.get('h1').should('have.text', 'Feature an item or category')
        cy.get('.en__ecfeaturelist__header').should('have.text', 'Featured List')
        cy.get('.en__product__price').should('have.text', '$9.00')
        cy.get('.en__button').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/page/13531/shop/3?productId=310&name=Avengers')
          })
        cy.get('.en__product__name').should('have.text', 'Avengers')
        cy.get('.en__product__optionType > select').should('have.value', 'Captain America')
        cy.get('.en__product__buy__quantity').should('have.value', '1')
        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')

        cy.get('.en__productSummary__item--description > p').should('have.text', 'Captain America')
        cy.get('.en__productSummary__item--price > .en__price').should('have.text', '$9.00')
        cy.get('.en__quantity__input').should('have.value', '1')
        cy.get('.en__productSummary__item--total > .en__price').should('have.text', '$9.00')
        cy.get('.en__component--eccheckout__submit').click()

        cy.location('pathname').should('include', '/page/13531/shop/5')

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Ecomm')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_ecomm@engagingnetworks.online')
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_supporter_address1').should('have.value', 'add1')
        cy.get('#en__field_supporter_address2').should('have.value', 'add2')
        cy.get('#en__field_supporter_postcode').should('have.value', '11112')
        cy.get('#en__field_supporter_city').should('have.value', 'city')
        cy.get('#en__field_supporter_region').should('have.value', 'HI')
        cy.get('#en__field_supporter_country').should('have.value', 'US')

        cy.get('.en__productSummary__item--description__optionNames').should('have.text', 'Captain America')
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$9.00')
        cy.get('button').click()

        validatesDonationPage()

        addPersonalMessageEmail()
        
        cy.get('.en__productSummary__item--description__optionNames').should('have.text', 'Captain America')
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$9.00')
        
        cy.get('button').click()

        cy.location('pathname').should('include', '/page/13531/shop/7')
        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$9.00')

        validateThankYouPage()
    
    })

     it('can add multiple items to the cart', () => {

        cy.get('.en__button').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/page/13531/shop/3?productId=310&name=Avengers')
          })

        cy.get('.en__product__optionType > select').should('have.value', 'Captain America')
        cy.get('.en__button').click()
        cy.wait(4000)
        cy.get('.en__product__optionType > select').select('Ironman')
        cy.wait(4000)
        cy.get('.en__button').click()
        cy.get('.en__product__optionType > select').select('Thor')
        cy.wait(4000)
        cy.get('.en__button').click()
        cy.get('.en__product__optionType > select').select('Thanos')
        cy.wait(4000)
        cy.get('.en__button').click()

        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        validatesMultiCart()
        cy.get('.en__component--eccheckout__submit').click()

        cartValidation()
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$36.00')
        cy.get('button').click()

        addPersonalMessageEmail()

        cy.scrollTo('bottom')
        validatesDonationPage()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$36.00')
        cy.get('button').click()
       
        validateThankYouPage()
        cy.location('pathname').should('include', '/page/13531/shop/7')
        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$36.00')

    })
      
    // it('completes to the thank you page ', () => {
    // })

    it('can add and remove items in cart', () => {
       
        cy.get('.en__button').click()
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')
        cy.get('.en__productSummary__item--total > .en__price').should('have.text', '$18.00')
        cy.get('.en__quantity__control--subtract').click()
        cy.wait(2000)
        cy.get('.en__productSummary__item--total > .en__price').should('have.text', '$9.00')
        cy.get('.en__component--eccheckout__submit').click()

        cartValidation()

        cy.get('button').click()

        cy.get('#en__field__method00').select('NONE').should('have.value', 'NONE')
        
        validatesDonationPage()
        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$9.00')
        cy.get('button').click()

        validateThankYouPage()

        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$9.00')

    })

    it('can increase contribution amount', () => {
       
        cy.get('.en__button').click()
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')

        cy.get('#en__field__input--radio--10').click()
        cy.get('.en__component--eccheckout__submit').click()

        cartValidation()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$28.00')
        cy.get('button').click()

        cy.get('#en__field__method00').select('NONE').should('have.value', 'NONE')
        cy.get('#en__field__method01').select('POSTCARD').should('have.value', 'POSTCARD')
        
        addPersonalMessageCard()
        validatesDonationPage()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$28.00')
        cy.get('button').click()

        validateThankYouPage()
        
        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$28.00')

    })

    it('can increase contribution with custom amount', () => {
    
        cy.get('.en__button').click()
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')

        cy.get('#en__field__input--radio--other').click()
        cy.get('.en__field__item--other > .en__field__input').type('50.00')
        cy.get('.en__component--eccheckout__submit').click()

        cartValidation()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$68.00')
        cy.get('button').click()

        cy.get('#en__field__method00').select('NONE').should('have.value', 'NONE')
        cy.get('#en__field__method01').select('NONE').should('have.value', 'NONE')
  
         validatesDonationPage()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$68.00')
        cy.get('button').click()

        validateThankYouPage()
        
        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$68.00')
      })

    it('can add and remove Promo Code', () => { //10DISC

        cy.get('.en__button').click()

        cy.location().should((loc) => {
            expect(loc.href).to.include('/page/13531/shop/3?productId=310&name=Avengers')
          })

        cy.get('.en__product__optionType > select').should('have.value', 'Captain America')

        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')

        cy.get('.en__productSummary__item--description > p').should('have.text', 'Captain America')
        cy.get('.en__quantity__control--add').click()
        cy.get('#ecpromo').type('10DISC')
        cy.wait(3000)
        cy.get('.en__component--eccheckout__submit').click()

        cy.location('pathname').should('include', '/page/13531/shop/5')

        cartValidation()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$16.20')
        cy.get('button').click()

        validatesDonationPage()

        cy.get('.en__ecOrderSummaryTotals__total--total > .en__price').should('have.text', '$16.20')
        cy.get('button').click()
       
        validateThankYouPage()
        
        cy.get('.en__component > :nth-child(15)').contains('39797')
        cy.get(':nth-child(24)').contains('$16.20')
    })
    
     it('cannot proceed if no items has been added to the cart', () => {
       
        cy.get('.en__button').click()
        cy.get('.en__quantity__control--add').click()
        cy.get('.en__button').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > .en__ecnav__cartCount').click()
        
        cy.location('pathname').should('include', '/page/13531/shop/4')
        cy.get('.en__productSummary__row > .en__productSummary__item--remove').click()
        cy.get('.en__component--eccheckout__continue').click()
        cy.get('.en__component--column > .en__component > .en__ecnav > .en__ecnav__list > .en__ecnav__item--cart > a').click()

      })

    function cartValidation(){

        cy.location('pathname').should('include', '/page/13531/shop/5')

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Ecomm')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_ecomm@engagingnetworks.online')
        cy.get('#en__field_supporter_emailAddress').clear().type(email)
        cy.get('#en__field_supporter_address1').should('have.value', 'add1')
        cy.get('#en__field_supporter_address2').should('have.value', 'add2')
        cy.get('#en__field_supporter_postcode').should('have.value', '11112')
        cy.get('#en__field_supporter_city').should('have.value', 'city')
        cy.get('#en__field_supporter_region').should('have.value', 'HI')
        cy.get('#en__field_supporter_country').should('have.value', 'US')

    }

    function validatesDonationPage(){
        
        cy.location('pathname').should('include', '/page/13531/shop/6')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'ST Ecomm CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222220')
        cy.get('#en__field_transaction_ccvv').should('have.value', '123')
        cy.get('#en__field_transaction_ccexpire').type('01')
        cy.get('.en__field__element > :nth-child(3) > .en__field__input').type('2023')
    }

    function addPersonalMessageEmail(){

        cy.get('#en__field__message00').type('This is test email')
        cy.get('#en__field__firstName00').type('Evy')
        cy.get('#en__field__lastName00').type('Test')
        cy.get('#en__field__emailAddress00').type('evy@engagingnetworks.net')
       
    }

    function addPersonalMessageCard(){

        cy.get('#en__field__message01').type('This is test card')
        cy.get('#en__field__firstName01').type('Evy')
        cy.get('#en__field__lastName01').type('Test')
        cy.get('#en__field__address101').type('1 Hilltop')
        cy.get('#en__field__city01').type('Baltimore')
        cy.get('#en__field__region01').type('Maryland')
        cy.get('#en__field__postCode01').type('20123')
        cy.get('#en__field__country01').type('USA')
    
    }

    function validateThankYouPage(){

        cy.location('pathname').should('include', '/page/13531/shop/7')

        cy.get('.en__component--column > .en__component > :nth-child(5)').contains( 'ST')
        cy.get('.en__component--column > .en__component > :nth-child(6)').contains('Ecomm')
        cy.get('.en__component--column > .en__component > :nth-child(7)').contains('add1')
        cy.get('.en__component > :nth-child(8)').contains('city')
        cy.get('.en__component > :nth-child(9)').contains('HI')
        cy.get('.en__component > :nth-child(10)').contains(email)
        cy.get('.en__component > :nth-child(11)').contains('11112')
        cy.get('.en__component > :nth-child(12)').contains('US')
        cy.get('.en__component > :nth-child(13)').contains('ST Ecomm CC Name')
        cy.get('.en__component > :nth-child(17)').contains('CREDIT_SINGLE')
        cy.get(':nth-child(18)').contains('USD')
        cy.get(':nth-child(20)').contains('IATS North America')
        cy.get(':nth-child(21)').contains('VISA')
    }

    function validatesMultiCart(){

        cy.location('pathname').should('include', '/page/13531/shop/4')   

        cy.get('[data-variantid="360"] > .en__productSummary__item--description > p')
        .should('have.text', 'Captain America')
        cy.get('[data-variantid="361"] > .en__productSummary__item--description > p')
        .should('have.text', 'Ironman')
        cy.get('[data-variantid="362"] > .en__productSummary__item--description > p')
        .should('have.text', 'Thor')
        cy.get('[data-variantid="363"] > .en__productSummary__item--description > p')
        .should('have.text', 'Thanos')
        cy.get('h3 > .en__price').should('have.text', '$36.00')
        
    }
    })
    describe('test us.e-activist LogIn ', ()=>{

        const todaysDate = Cypress.moment().format('MM_DD_YYYY')
        const email = ('st_ecomm_' + todaysDate + '@engagingnetworks.online')
        
        it('searches for the supporters donation transaction', () => {
         
            logIn()
            cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
            .type(email)
            cy.get('.userInput__action > .button').click()
            cy.get('.icon--search--color').click()
            cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
                expect(text.trim()).contains('etm')
            })
            logOut()
         })
    
         function logIn(){
            cy.visit(Cypress.env('dallasLogIn')+'#login')

       
             cy.get('#enLoginUsername').type(Cypress.env('userLogin'))
             cy.get('#enLoginPassword').type(Cypress.env('userPassword'))
             cy.get('.button').click()
          
          }
          function logOut(){
    
            cy.get('.dashboard__action--close').click()
            cy.get('.enLayout__navItem--hasSubNav > [href="#"]').click()
            cy.get('.enLayout__nav--secondary > .enLayout__navItem--hasSubNav > .enLayout__nav > ul > :nth-child(4) > a').click()
            cy.url().should('contain','#login')
          }
 })