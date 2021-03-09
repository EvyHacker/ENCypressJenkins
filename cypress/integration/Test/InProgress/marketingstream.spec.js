/// <reference types="Cypress" />

context('Marketing Stream', () => {
  const entityMessageId = 136
  const cyMessage = { name: 'cyMessage', subject: 'cySubject', contentHtml: 'cyContent', status: 'EDIT', entityMessageId: entityMessageId }

  const enToken = { token: Cypress.env('enToken') }

  const getOptions = messageId => {
    return { url: `/ea-dataservice/rest/marketingstream/message/${messageId}`, headers: enToken }
  }

  const postOptions = message => {
    return { method: 'POST', url: '/ea-dataservice/rest/marketingstream/message', body: message, headers: enToken }    
  }

  const putOptions = message => {
    return { method: 'PUT', url: `/ea-dataservice/rest/marketingstream/message/${message.id}`, body: message, headers: enToken }
  }

  const deleteOptions = messageId => {
    return { method: 'DELETE', url: `/ea-dataservice/rest/marketingstream/message/${messageId}`, headers: enToken }    
  }

  // const reset = () => {
  //   getMessages().each(deleteMessage)
  //   initialMessages.forEach(add)
  // }

  it('can get all messages', () => {
    cy.request({ url: '/ea-dataservice/rest/marketingstream/message', headers: enToken }).
      its('body').should('have.length', 4).each(value =>
        expect(value).to.have.all.keys('id', 'clientId', 'createdOn', 'modifiedOn', 'entityMessageId', 'googleAnalytics', 'name', 'ownerEmail', 'ownerId', 'replyToEmailId', 'senderEmailId', 'status', 'subject', 'useInline')
      )
  })

  const messageId = 138
  it('can get a specific message', () => {
    cy.request({ url: `/ea-dataservice/rest/marketingstream/message/${messageId}`, headers: enToken }).then(response => {
      const message = response.body
      assert.equal(message.id, messageId)
      assert.equal(message.status, 'APPROVED')
      // TODO: assert other fields
    })
  })

  it('can create a new message', () => {
    cy.request({ method: 'POST', url: '/ea-dataservice/rest/marketingstream/message', headers: enToken, body: cyMessage }).then(response => {
      cy.request(deleteOptions(response.body.id))
    })
  })

  it('can update an existing message', () => {
    cy.request(postOptions(cyMessage)).then(response => {
      cy.request(getOptions(response.body.id)).then(response => {
        assert.equal(response.body.status, 'EDIT')
        response.body.status = 'PENDING'
        cy.request({ method: 'PUT', url: `/ea-dataservice/rest/marketingstream/message/${response.body.id}`, body: response.body, headers: enToken })

        cy.request(getOptions(response.body.id)).then(response => {
          assert.equal(response.body.status, 'PENDING')
          response.body.status = 'EDIT'
          cy.request(putOptions(response.body))
  
          cy.request(deleteOptions(response.body.id))
        })
      })
    })
  })

  it('can delete an existing message', () => {
    cy.request(postOptions(cyMessage)).then(response => {
      cy.request({ method: 'DELETE', url: `/ea-dataservice/rest/marketingstream/message/${response.body.id}`, headers: enToken })
    })
  })
})
