import 'cypress-file-upload';
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
 Cypress.Commands.add("login", (username, password) => {
  cy.visit(Cypress.config().baseUrl);
  cy.get('input[name=username]').type(username);//'napplicant');//to parametarize
  cy.get('input[name=password]').type(password+'{enter}');//'P@ssw0rd0114{enter}');
  cy.hash().should('eq', '#/applicants')

 /* **** BELOW CODE IS BEST PRACTICE, BUT method NOT ALLOWED
  cy.request({
    method: 'POST',
    url:'https://login.grants.boozallencsn.com',
    body: {
      user: {
        username: username,
        password: password,
      }
    }
  })
  .then((resp)=> {
    window.localStorage.setItem('jwt',resp.body.user.token)
  })*/
});
Cypress.Commands.add(
  "attach_file",
  {
    prevSubject: "element"
  },
  ($input, AnyFileName) => {
    const file = new File([], AnyFileName);
    const dt = new DataTransfer();
    dt.items.add(file);
    $input[0].files = dt.files;
    //var Myfiles=dt.files;
    //alert(Myfiles.length);
    //alert(Myfiles[0].name);
    return $input;
  }
);

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
