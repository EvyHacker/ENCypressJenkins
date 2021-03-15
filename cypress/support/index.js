// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
const path = require('path');

module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, args) => {
    console.log(config, browser, args);
    if (browser.name === 'chrome') {
      const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
      args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
      args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
    }
    return args;
  })
}
Cypress.Commands.add("isNotActionable", function(selector, done) {
  cy.get(selector).click()
  cy.once('fail', (err) => {
    expect(err.message).to.include('cy.click() failed because this element');
    expect(err.message).to.include('is being covered by another element');
    done();
  });
  // cy.get('[id="bank-list-item-0"]').click().then(x => {
  //         // Only here if click succeeds (so test fails)
  //         done(new Error('Expected button NOT to be clickable, but click() succeeded'));
  //         })
}) 