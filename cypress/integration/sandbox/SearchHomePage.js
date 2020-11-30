Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

describe('My First Test', function() {
    beforeEach(() => {
        cy.visit(Cypress.env('mainGrantURL')) //https://grants.gov
    })

    /*Validate banner links*/

    it('validates useful menu items', () => {
        cy.get('#globalnav > ul').within(() => {
            cy.get('li').eq(0).contains('Help').click()
            cy.window().then((win) => {
                cy.stub(win, 'open', url => 
                {
                  // change window location to be same as the popup url
                  win.location.href = Cypress.config().mainGrantURL + url;
                 
                }).as("popup") // alias it with popup, so we can wait refer it with @popup
              })

                // Click link which triggers javascript's window.open() call
                cy.get('li').eq(0).contains('Help').click()
                // Make sure that it triggered window.open function call
                cy.get("@popup").should('be.called')
              
            })
            //Validate Register link
            cy.get('li').eq(1).contains('Register').click()
            cy.url().should('include', '/register.html')
            cy.go('back')
            //Validate Login link
            cy.get('li').eq(2).contains('Login').click()
            cy.url().should('include', '/apply/login')
            cy.go('back')
        })

    it('validates top menu items', () => {

        //Validate top menu and drop down menus content
        cy.get('#topnav').find('li').should(($li) => {
            expect($li).to.have.length(9)
            expect($li.eq(0)).to.have.text(' Home ')
            expect($li.eq(1)).to.have.id('LearnGrants-tab')
            expect($li.eq(2)).to.have.text(' Search Grants ')
            expect($li.eq(3)).to.include.text(' Applicants ')
            expect($li.eq(4)).to.include.text(' Grantors ')
            expect($li.eq(5)).to.include.text(' System-to-System ')
            expect($li.eq(6)).to.include.text(' Forms ')
            expect($li.eq(7)).to.include.text(' Connect ')
            expect($li.eq(8)).to.include.text(' Support ') 
        })
    })

    //Validate Search Grants link and path
    it('validates Search Grants link', () => {
        cy.contains('Search Grants').click()
        cy.url().should('include','/search-grants')

    })
    it('hover over Learn Grants tab and validate content', () => {
    
        cy.get('#LearnGrants-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('.gig-nav >li').within(($li) => {
            cy.get($li.eq(0)).should('include.text', 'Grants 101')
            cy.get($li.eq(1)).should('include.text', 'Grant Policies')
            cy.get($li.eq(2)).should('include.text', 'Grant Eligibility')
            cy.get($li.eq(3)).should('include.text', 'Grant Terminology')
            cy.get($li.eq(4)).should('include.text', 'Grant-Making Agencies')
            cy.get($li.eq(5)).should('include.text', 'Grant Systems')
            cy.get($li.eq(6)).should('include.text', 'Grant Programs')
            cy.get($li.eq(7)).should('include.text', 'Grant Careers')
            cy.get($li.eq(8)).should('include.text', 'Grant Reporting')
            cy.get($li.eq(9)).should('include.text', 'Grant Fraud')
        })
    })

    it('hover over Applicants tab and validate content', () => {
    
        cy.get('#Applicants-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#Applicants-menu').find('ul li').within(($li) => {
            cy.get($li.eq(0)).should('include.text', 'How to Apply for Grants')
            cy.get($li.eq(1)).should('include.text', 'Track My Application')
            cy.get($li.eq(2)).should('include.text', 'Workspace Overview')
            cy.get($li.eq(3)).should('include.text', 'Applicant Eligibility')
            cy.get($li.eq(4)).should('include.text', 'Organization Registration')
            cy.get($li.eq(5)).should('include.text', 'Applicant Registration')
            cy.get($li.eq(6)).should('include.text', 'Applicant Training')
            cy.get($li.eq(7)).should('include.text', 'Applicant FAQs')
            cy.get($li.eq(8)).should('include.text', 'Adobe Software Compatibility')
            cy.get($li.eq(9)).should('include.text', 'Submitting UTF-8 Special Characters')
            cy.get($li.eq(10)).should('include.text', 'Encountering Error Messages')
        })
    })

    it('hover over Grantors tab and validate content', () => {
    
        cy.get('#Grantors-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#Grantors-menu').find('ul li').within(($li) => {
            
            cy.get($li.eq(0)).should('include.text', 'Grantor Registration')
            cy.get($li.eq(1)).should('include.text', 'Grantor Tools & Tips')
            cy.get($li.eq(2)).should('include.text', 'Grantor FAQs')
            cy.get($li.eq(3)).should('include.text', 'Grantor Standard Language')
            cy.get($li.eq(4)).should('include.text', 'Submitting UTF-8 Special Characters')
            cy.get($li.eq(5)).should('include.text', 'Grantor Help')
        })
    })
    
    it('hover over System-to-System tab and validate content', () => {
    
        cy.get('#System-to-System-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#System-to-System-menu').find('h3').first().should('include.text', 'Applicant System-to-System')
        cy.get('#System-to-System-menu').find('h3').should('include.text', 'Grantor System-to-System')
        cy.get('#System-to-System-menu').find('ul li').within(($li) => {
            cy.get($li.eq(0)).should('include.text', 'Versions & WSDLs')
            cy.get($li.eq(1)).should('include.text', 'Web Services')
            cy.get($li.eq(2)).should('include.text', 'Schemas')
            cy.get($li.eq(3)).should('include.text', 'Hashing')
            cy.get($li.eq(4)).should('include.text', 'Certificates')
            cy.get($li.eq(5)).should('include.text', 'Testing')
            cy.get($li.eq(6)).should('include.text', 'Reference Implementation')
            cy.get($li.eq(7)).should('include.text', 'Listserv')
            cy.get($li.eq(8)).should('include.text', 'Troubleshooting')
            cy.get($li.eq(9)).should('include.text', 'Versions & WSDLs')
            cy.get($li.eq(10)).should('include.text', 'Web Services')
            cy.get($li.eq(11)).should('include.text', 'Schemas')
            cy.get($li.eq(12)).should('include.text', 'Certificates')
            cy.get($li.eq(13)).should('include.text', 'Testing')
            cy.get($li.eq(14)).should('include.text', 'Reference Implementation')
            cy.get($li.eq(15)).should('include.text', 'Listserv')
            cy.get($li.eq(16)).should('include.text', 'Troubleshooting')
            cy.get($li.eq(17)).should('include.text', 'RESTful APIs')
            
        })
    })

    it('hover over Forms tab and validate content', () => {
    
        cy.get('#Forms-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#Forms-menu').find('h3').first().should('include.text', 'Forms Repository')
        cy.get('#Forms-menu').find('h3').should('include.text', 'Forms Development')
        cy.get('#Forms-menu').find('ul li').within(($li) => {
            cy.get($li.eq(0)).should('include.text', 'R&R Family')
            cy.get($li.eq(1)).should('include.text', 'SF-424 Family')
            cy.get($li.eq(2)).should('include.text', 'SF-424 Individual Family')
            cy.get($li.eq(3)).should('include.text', 'SF-424 Mandatory Family')
            cy.get($li.eq(4)).should('include.text', 'SF-424 Short Organization Family')
            cy.get($li.eq(5)).should('include.text', 'Post-Award Reporting Forms')
            cy.get($li.eq(6)).should('include.text', 'Retired Forms')
            cy.get($li.eq(7)).should('include.text', 'Forms Status Report')
            cy.get($li.eq(8)).should('include.text', 'Forms Process')
            cy.get($li.eq(9)).should('include.text', 'Forms Request')
            cy.get($li.eq(10)).should('include.text', 'Country and State Lists Update')
            cy.get($li.eq(11)).should('include.text', 'Planned UEI Updates')
            
        })
    })

    it('hover over Connect tab and validate content', () => {
    
        cy.get('#Connect-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#Connect-menu').find('h3').first().should('include.text', 'Manage Subscriptions')
        cy.get('#Connect-menu').find('h3').should('include.text', 'Social Media')
        cy.get('#Connect-menu').find('ul li a').should('include.text', 'Newsletter Archive')
        
    })

    it('hover over Support tab and validate content', () => {
    
        cy.get('#Support-tab > .parent').trigger('mouseover').invoke('focus')
        cy.get('#Support-menu').find('ul li').within(($li) => {
            
            cy.get($li.eq(0)).should('include.text', 'About Grants.gov')
            cy.get($li.eq(1)).should('include.text', 'Program Management Office')
            cy.get($li.eq(2)).should('include.text', 'Grants.gov Notices')
            cy.get($li.eq(3)).should('include.text', 'Grants.gov Calendar')
            cy.get($li.eq(4)).should('include.text', 'Grants.gov Releases')
            cy.get($li.eq(5)).should('include.text', 'Grants.gov Logo Usage')
        })
    })

        //Valdiate icon bar links and its pages
    it('can validate links and its pages', () => { 
        cy.get('#iconbar').find('a').should(($a) => {
            expect($a, '10 items').to.have.length(10)
            expect($a.eq(0)).to.include.text('Search Grants')
            expect($a.eq(1)).to.include.text('Get Started')
            expect($a.eq(2)).to.include.text('Grant Policies')
            expect($a.eq(3)).to.include.text('Grant-Making Agencies')
            expect($a.eq(4)).to.include.text('Prevent Scams')
            expect($a.eq(5)).to.include.text('Community Blog')
            expect($a.eq(6)).to.include.text('Twitter Feed')
            expect($a.eq(7)).to.include.text('YouTube Videos')
            expect($a.eq(8)).to.include.text('Online Help')
            expect($a.eq(9)).to.include.text('Support Center') 
        }) 
        cy.contains('Search Grants').click()
        cy.url().should('include', '/search-grants')
        cy.go('back')
        cy.contains('Get Started').click()
        cy.url().should('include', '/apply-for-grants')
        cy.go('back')
        cy.contains('Grant Policies').click()
        cy.url().should('include', '/grant-policies')
        cy.go('back')
        cy.contains('Grant-Making Agencies').click()
        cy.url().should('include', '/grant-making-agencies')
        cy.go('back')
        cy.contains('Prevent Scams').click()
        cy.url().should('include', '/grant-fraud')
        cy.go('back')

           // We can remove the offending attribute - target='_blank'
           // that would normally open content in a new tab.
        cy.contains('Community Blog').invoke('removeAttr', 'target').click()
        cy.url().should('be.eq', 'https://grantsgovprod.wordpress.com/')
        cy.go('back')
         // the href 'attribute' will only ever be what the
         // literal value is on the element itself and will
         // match what was served by the <html> payload
        cy.contains('Twitter Feed').should('have.attr', 'href').and('equal', 'https://twitter.com/grantsdotgov')
         // We can still test this by visiting the href property that
         // would normally cause our browser to be navigated.
        cy.contains('YouTube Videos').should('have.prop', 'href').and('equal', 'https://www.youtube.com/user/GrantsGovUS')
        cy.contains('Online Help').should('have.attr', 'href')
        cy.contains('Support Center').click()
        cy.url().should('include', '/support')
        cy.go('back')

        })
    
        //Validate panel blosk links
    
    it('can validate panel block' , ()=> {
        cy.get(':nth-child(5) > div > iframe').invoke('attr', 'title').
        should('include', 'Intro to Applying for Federal Grants with Grants.gov')
        cy.get(':nth-child(8) > div > iframe').invoke('attr', 'title').
        should('include', 'What is the Unique Entity Identifier?')
        cy.get('.controls-visible').invoke('text').as('article')
        cy.get('@article').should('include', 'Apply for Grants as a Team')
        cy.get('@article').should('include', 'Easily collaborate on your federal grant applications')
        cy.get('@article').should('include', '"What Is...?" Blog Series')
        cy.get('@article').should('include', 'Get smart about the world of federal grants')
        cy.get('@article').should('include', 'Next Maintenance: June 20-22, 2020')
        cy.get('@article').should('include', 'Software releases bring users new features and fixes')
        cy.get('@article').should('include', 'Grant Writing Tips')
        cy.get('@article').should('include', 'Principles and examples of good federal grant-writing')
        cy.get('@article').should('include', 'Planned UEI Form Updates')
        cy.get('@article').should('include', 'Grants Learning Center')
        cy.get('@article').should('include', 'Your gateway to the federal grants world')
        cy.get('@article').should('include', 'Upcoming User Impacts')
        cy.get('@article').should('include', 'Notices of upcoming system changes to Grants.gov')
        

        /*Validate footer */
        cy.get('#footer').then((footer) => {
            cy.get(footer).find('#footnav > :nth-child(1)').invoke('text').should(($foot) => {
                expect($foot).to.contain('CONNECT WITH US:')
                expect($foot).to.contain('Blog')
                expect($foot).to.contain('Twitter')
                expect($foot).to.contain('YouTube')
                expect($foot).to.contain('Alerts RSS')
                expect($foot).to.contain('XML Extract')
                expect($foot).to.contain('Get Adobe Reader')
            })
            cy.get(footer).find('#footnav > :nth-child(2)').invoke('text').should(($foot) => {
                expect($foot).to.contain('HEALTH & HUMAN SERVICES:')
                expect($foot).to.contain('HHS.gov')
                expect($foot).to.contain('EEOC / No Fear Act')
                expect($foot).to.contain('Accessibility')
                expect($foot).to.contain('Privacy')
                expect($foot).to.contain('Disclaimers')
                expect($foot).to.contain('Site Map')
            })
            cy.get(footer).find('#footnav > :nth-child(3)').invoke('text').should(($foot) => {
                expect($foot).to.contain('COMMUNITY:')
                expect($foot).to.contain('USA.gov')
                expect($foot).to.contain('WhiteHouse.gov')
                expect($foot).to.contain('USAspending.gov')
                expect($foot).to.contain('SBA.gov')
                expect($foot).to.contain('CFDA.gov')
                expect($foot).to.contain('SAM.gov')
                expect($foot).to.contain('DUNS Request')
                expect($foot).to.contain('Report Fraud')
            })  
            
        })
        cy.get('#footbrand').should('include.text', ' GRANTS.GOV Applicant Support 1-800-518-4726support@grants.gov')

    })    
})