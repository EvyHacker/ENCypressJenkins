/// <reference types="Cypress" />


describe('test Single and/or Recurring donation ', ()=>{
    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailSingle = ('st_premiumgifts_single_' + todaysDate + '@engagingnetworks.online')//PTM
    const emailRecur = ('st_premiumgifts_recur_' + todaysDate + '@engagingnetworks.online')
    const emailNoGift = ('st_premiumgift_nogift_' + todaysDate + '@engagingnetworks.online')

    beforeEach(() => {
        cy.visit(Cypress.env('toronto')+'page/49806/donate/1')
      })
      
    it('loads with correct page 1 content', () => {

        cy.get('#en__field_supporter_firstName').should('have.value', 'ST Premium Donation')
        cy.get('#en__field_supporter_lastName').should('have.value', 'Toronto')
        cy.get('#en__field_supporter_emailAddress').should('have.value', 'st_premiumdonationtoronto@engagingnetworks.online')
        cy.get('#en__field_supporter_address1').should('have.value', 'address1')
        cy.get('#en__field_supporter_city').should('have.value', 'Tribeca')
        cy.get('#en__field_supporter_region').should('have.value', 'NY')
        cy.get('#en__field_supporter_country').should('have.value', 'USA')
        cy.get('#en__field_supporter_postcode').should('have.value', '111222')
        cy.get('#en__field_transaction_paymenttype').should('have.value', 'Visa')
        cy.get('#en__field_supporter_creditCardHolderName').should('have.value', 'Smoke Test CC Name')
        cy.get('#en__field_transaction_ccnumber').should('have.value', '4222222222222220')
        cy.get('#en__field_transaction_ccvv').should('have.value', '111')
        
    })

    it('submits single donation <=$5, no gift', () => {

         cy.get('#en__field_supporter_emailAddress').clear().type(emailNoGift)
         cy.get('#en__field_transaction_donationAmt0').check()
         cy.get('#en__field_transaction_ccexpire').type('01')
         cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
         cy.get('button').click()
         ValidateThankYouPage()
         cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailNoGift)
         cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_SINGLE')
         cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$5.00')

    })

   it('submits single donation no shipping', () => {

       cy.get('#en__field_supporter_emailAddress').clear().type(emailSingle)
       cy.get('#en__field_transaction_donationAmt1').check()
       cy.get('#en__field_transaction_ccexpire').type('01')
       cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
       cy.get('.en__pg__name').should('have.text', 'Pen with Name Engraved')
       cy.get('#en__field_transaction_shipenabled1').check()
       cy.get('button').click()

       ValidateThankYouPage()
       cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailSingle)
       cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_SINGLE')
       cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$10.00')

    })

    it('submits single donation with shipping', () => {

      cy.get('#en__field_supporter_emailAddress').clear().type(emailSingle)
      cy.get('#en__field_transaction_donationAmt2').check()
      cy.get('#en__field_transaction_ccexpire').type('01')
      cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
      cy.get('.en__pg__name').should('have.text', 'Pen with Name Engraved')
      cy.get('#en__field_transaction_shipenabled0').check()
      
      AddShippingDetails()
      cy.get('button').click()

      ValidateThankYouPage()
      cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailSingle)
      cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_SINGLE')
      cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$20.00')

   })

   it('submits recurring donation without shipping', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(emailRecur)
    cy.get('#en__field_transaction_donationAmt2').check()
    cy.get('#en__field_transaction_ccexpire').type('01')
    cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
    cy.get('#en__field_transaction_recurrpay').check()
    cy.get('#en__field_transaction_recurrfreq').type('DAILY')
    cy.get('.en__pg__name').should('have.text', 'Crystal Pens')
    cy.get('.en__pg__optionType > select').select('Pink')
    cy.get('#en__field_transaction_shipenabled1').check()
    cy.get('button').click()

    ValidateThankYouPage()
    cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailRecur)
    cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_RECURRING')
    cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$20.00')
    cy.get(':nth-child(21)').contains('DAILY')
    cy.get(':nth-child(22) > [style="font-size:12px;"] > span').contains('ACTIVE')

   })

   it('submits recurring donation with shipping', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(emailRecur)
    cy.get('#en__field_transaction_donationAmt2').check()
    cy.get('#en__field_transaction_ccexpire').type('01')
    cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
    cy.get('#en__field_transaction_recurrpay').check()
    cy.get('#en__field_transaction_recurrfreq').type('MONTHLY')
    cy.get('.en__pg__name').should('have.text', 'Crystal Pens')
    cy.get('.en__pg__optionType > select').select('Green')
    cy.get('#en__field_transaction_shipenabled0').check()
    AddShippingDetails()
    cy.get('button').click()

    ValidateThankYouPage()
    cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailRecur)
    cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_RECURRING')
    cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$20.00')
    cy.get(':nth-child(21)').contains('MONTHLY')
    cy.get(':nth-child(22) > [style="font-size:12px;"] > span').contains('ACTIVE')

   })

   it('submits recurring donation <=$10, no gift', () => {

    cy.get('#en__field_supporter_emailAddress').clear().type(emailNoGift)
    cy.get('#en__field_transaction_donationAmt1').check()
    cy.get('#en__field_transaction_ccexpire').type('01')
    cy.get('.en__field--splittext > .en__field__element > :nth-child(3) > .en__field__input').type('2023')
    cy.get('#en__field_transaction_recurrpay').check()
    cy.get('#en__field_transaction_recurrfreq').type('QUARTERLY')
    cy.get('button').click()

    ValidateThankYouPage()
    cy.get(':nth-child(6) > [style="font-size:12px;"] > span').contains(emailNoGift)
    cy.get(':nth-child(13) > [style="font-size:12px;"] > span').contains('CREDIT_RECURRING')
    cy.get(':nth-child(20) > [style="font-size:12px;"] > span').contains('$10.00')
    cy.get(':nth-child(21) > [style="font-size:12px;"] > span').contains('QUARTERLY')
    cy.get(':nth-child(22) > [style="font-size:12px;"] > span').contains('ACTIVE')

})

   function AddShippingDetails(){

    cy.get('#en__field_transaction_shipfname').type('ST Prem Donation')
    cy.get('#en__field_transaction_shiplname').type('Shipping Donation')
    cy.get('#en__field_transaction_shipadd1').type('Shipping_Address 1')
    cy.get('#en__field_transaction_shipadd2').type('Shipping_Address 2')
    cy.get('#en__field_transaction_shipcity').type('Shipping_City')
    cy.get('#en__field_transaction_shipregion').select('VA')
    cy.get('#en__field_transaction_shipcountry').select('USA')
    cy.get('#en__field_transaction_shippostcode').type('112233')
    cy.get('#en__field_transaction_shipemail').type('st_premiumdonationtoronto@engagingnetworks.online')
    cy.get('#en__field_transaction_shipnotes').type('Shipping Test')

   }

    function ValidateThankYouPage(){

      cy.location('pathname').should('include', '/page/49806/donate/2')
      cy.get(':nth-child(1) > [style="font-size:12px;"] > span').contains( 'ST Premium Donation')
      cy.get(':nth-child(2) > [style="font-size:12px;"] > span').contains('Toronto')
      cy.get(':nth-child(3) > [style="font-size:12px;"] > span').contains('address1')
      cy.get(':nth-child(4) > [style="font-size:12px;"] > span').contains('Tribeca')
      cy.get(':nth-child(5) > [style="font-size:12px;"] > span').contains('NY')
      cy.get(':nth-child(7) > [style="font-size:12px;"] > span').contains('111222')
      cy.get(':nth-child(8) > [style="font-size:12px;"] > span').contains('USA')
      cy.get(':nth-child(11) > [style="font-size:12px;"] > span').contains('160157')
      cy.get(':nth-child(16) > [style="font-size:12px;"] > span').contains('IATS North America')
      cy.get(':nth-child(17) > [style="font-size:12px;"] > span').contains('VISA')
      
  }
  })
  describe('test us.e-activist LogIn ', ()=>{

    const todaysDate = Cypress.moment().format('MM_DD_YYYY')
    const emailSingle = ('st_premiumgifts_single_' + todaysDate + '@engagingnetworks.online')
    const emailRecur = ('st_premiumgifts_recur_' + todaysDate + '@engagingnetworks.online')
    const emailNoGift = ('st_premiumgift_nogift_' + todaysDate + '@engagingnetworks.online')
    
      it('searches for the supporters recurring donation transaction', () => {
     
          logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(emailRecur)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('ptm')
            expect(text.trim()).contains('fcr')
        })
        logOut()
      })
      it('searches for the supporters single donation transaction', () =>{
  
        logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(emailSingle)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('ptm')
            expect(text.trim()).contains('fcs')
     })
     logOut()
    })

     it('searches for the supporters with no gift donation transaction', () =>{
  
        logIn()
          cy.get('.enDashboard__gadget__content > form > .userInput > .userInput__field > input')
          .type(emailNoGift)
          cy.get('.userInput__action > .button').click()
          cy.get('.icon--search--color').click()
          cy.get('.gadget__transactionHistory__transaction__field__type').invoke('text').then((text) => {
            expect(text.trim()).contains('fcs')
     })
     logOut()
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