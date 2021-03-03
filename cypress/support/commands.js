// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-wait-until';
import 'cypress-iframe'


Cypress.Commands.add('waitForStripe3dIframeMember', callback => {
  const outerIframe = cy
    .get('iframe[name*="__privateStripeFrame"]')
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .then(cy.wrap)

  const innerIframe = outerIframe
    .find('iframe[id=challengeFrame]')
    .its("0.contentDocument.body")
    .should("not.be.empty")
    .and('include.text','Politicalnetworks')
    .then(cy.wrap)

   return innerIframe
});

Cypress.Commands.add('waitForStripe3dIframe', callback => {
    const outerIframe = cy
      .get('iframe[name*="__privateStripeFrame"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('iframe[id*="challengeFrame"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
     return innerIframe
  });

  Cypress.Commands.add('failForStripe3dIframe', callback => {
    const outerIframe = cy
      .get('iframe[name*="__privateStripeFrame"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('iframe[id=challengeFrame]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
     return innerIframe
  });

  Cypress.Commands.add('waitForStripe3DIframe', callback => {
    const outerIframe = cy
      .get('iframe[name*="__privateStripeFrame"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('iframe[id=challengeFrame]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
     return innerIframe
      .find("iframe[name=acsFrame]")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  });

  Cypress.Commands.add('failForStripe3DIframe', callback => {
    const outerIframe = cy
      .get('iframe[name*="__privateStripeFrame"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('iframe[id=challengeFrame]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
      return innerIframe
      .find("iframe[name=acsFrame]")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  });

const getStripeSCAIframe = () => {
    const outerIframe = cy
      .get('iframe[src*="https://js.stripe.com/v3/authorize"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    const innerIframe = outerIframe
      .find('iframe[src*="https://hooks.stripe.com"]')
      .its("0.contentDocument.body")
      .should("not.be.empty")
      .then(cy.wrap)
  
    return innerIframe
      .find('button', 'Complete').click()
    //   .its("0.contentDocument.body")
    //   .should("not.be.empty")
    //   .then(cy.wrap)
  }

Cypress.Commands.add(
    'iframeLoaded',
    {prevSubject: 'element'},
    ($iframe) => {
        const contentWindow = $iframe.prop('contentWindow');
        return new Promise(resolve => {
            if (
                contentWindow &&
                contentWindow.document.readyState === 'complete'
            ) {
                resolve(contentWindow)
            } else {
                $iframe.on('load', () => {
                    resolve(contentWindow)
                })
            }
        })
    });


Cypress.Commands.add(
    'getInDocument',
    {prevSubject: 'document'},
    (document, selector) => Cypress.$(selector, document)
)

Cypress.Commands.add(
    'getWithinIframe',
    (targetElement) => cy.get('iframe').iframeLoaded().its('document').getInDocument(targetElement)
)

Cypress.Commands.add('getIframeBody', () => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    cy.log('getIframeBody')
    return cy
    .get('iframe[data-cy="the-frame"]', { log: false })
    .its('0.contentDocument.body', { log: false }).should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then((body) => cy.wrap(body, { log: false }))
  })

  Cypress.Commands.add('isIFrameReady', () => {
    return cy.window().then({ timeout: 10 * 1000 }, window => {
      return new Cypress.Promise(resolve => {
        window.addEventListener('message', e => {
          const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
  
          if (data.code === 'Ready') {
            resolve()
          }
        })
      })
    })
  })

  Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
    return new Cypress.Promise(resolve => {
        $iframe.on('load', () => {
            resolve($iframe.contents().find('body'));
        });
    });
});

Cypress.Commands.add(
  'selectNth',
  { prevSubject: 'element' },
  (subject, pos) => {
    cy.wrap(subject)
      .children('option')
      .eq(pos)
      .then(e => {
        cy.wrap(subject).select(e.val())
      })
  }
)