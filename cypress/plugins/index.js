/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200 on non-retina screens
      // and 2800x2400 on retina screens
      launchOptions.args.push('--window-size=1400,1200')

      // force screen to be non-retina (1400x1200 size)
      launchOptions.args.push('--force-device-scale-factor=1')

      // force screen to be retina (2800x2400 size)
      // launchOptions.args.push('--force-device-scale-factor=2')
      //launchOptions.extensions.push('Users/jane/path/to/extension')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      // fullPage screenshot size is 1400x1200
      launchOptions.preferences.width = 1400
      launchOptions.preferences.height = 1200
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      // menubars take up height on the screen
      // so fullPage screenshot size is 1400x1126
      launchOptions.args.push('--width=1400')
      launchOptions.args.push('--height=1200')
    }

    return launchOptions
  })
}

const path = require('path');
module.exports = (on, config) => {
  on('before:browser:launch', (browser, args) => {
    console.log(config, browser, args);
    if (browser.name === 'chrome') {
      const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
      args.push(args.push(`--load-extension=${ignoreXFrameHeadersExtension}`));
      args.push("--disable-features=CrossSiteDocumentBlockingIfIsolating,CrossSiteDocumentBlockingAlways,IsolateOrigins,site-per-process");
    }
    return args;
  })
}

module.exports = (on, config) => {
  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.family === 'chromium' && browser.name !== 'electron') {
      // provide absolute path to unpacked extension's folder
      launchOptions.extensions.push('/Users/ievgeniiagaidarenko/EngagingNetworks/cypress/ENCypressJenkins/cypress/extensions/gleekbfjekiniecknbkamfmkohkpodhe')
    }

    return launchOptions
  })
}


