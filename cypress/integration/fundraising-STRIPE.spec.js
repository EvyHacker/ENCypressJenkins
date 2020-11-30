/// <reference types="Cypress" />

import { generateRandomString } from '../support/utils';

describe('Donate 663', function()  {
 // beforeEach(() => {
    //cy.visit('/page/663/donate/1?mode=DEMO')
    Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
        Cypress.log({
          name: 'iframe',
          consoleProps() {
            return {
              iframe: $iframe,
            }
          },
        })
      
        return new Cypress.Promise(resolve => {
          onIframeReady(
            $iframe,
            () => {
              resolve($iframe.contents().find('body'))
            },
            () => {
              $iframe.on('load', () => {
                resolve($iframe.contents().find('body'))
              })
            }
          )
        })
      })

  it('starts with correct page 1 defaults', function() {
    cy.visit('/page/12663/donate/1?mode=DEMO')
    cy.get('#en__field_transaction_donationAmt').select('10')
    cy.get('#en__field_supporter_title').select('Ms.')
    cy.get('#en__field_supporter_firstName').type('Evy')
    cy.get('#en__field_supporter_lastName').type('Tester')
    cy.get('#en__field_supporter_emailAddress').type('evy_stripe@engagingnetworks.net')
    cy.get('button').click()

    fillAddressForm()
    
    cy.get('#en__field_supporter_creditCardHolderName').type('Evy')
    cy.get('#en__field_transaction_ccnumber').type('4000002500003155')
    cy.get('#en__field_transaction_ccexpire').type('12')
    cy.get(':nth-child(3) > .en__field__input').type('2020')
    cy.get('#en__field_transaction_ccvv').type('123')
    cy.get('button').click()
    cy.wait(5000)

  })
  it('Should get the credit card number element and type', function() {
    cy
      .get('iframe')
      .iframe()
      .find('input')

    cy.get('iframe').then(function($iframe) {
      const $body = $iframe.contents().find('body')
      cy
        .wrap($body)
        .find('input:eq(0)')
        .type('4242')
        .type('4242')
        .type('4242')
        .type('4242')
    })
      
      
      })
     

  function fillAddressForm() {
    
    cy.get('#en__field_supporter_address1').type('1 Hilltop Rd')
    cy.get('#en__field_supporter_city').type('Baltimore')
    cy.get('#en__field_supporter_region').select('MD')
    cy.get('#en__field_supporter_postcode').type('20001')
    cy.get('#en__field_supporter_country').select('US')
    cy.get('#en__field_transaction_othamt1').type('other amount test1')
    cy.get('#en__field_transaction_othamt2').type('other amount test2')
    cy.get('#en__field_transaction_othamt3').type('other amount test3')
    cy.get('#en__field_transaction_othamt4').type('other amount test4')
    cy.get('#en__field_supporter_appealCode').type('appeal code1')
    cy.get('#en__field_transaction_dirgift').type('gift1')
    cy.get('#en__field_transaction_comments').type('test comments')
    cy.get('#en__field_transaction_taxdeductible').type('Y')
    
}
})