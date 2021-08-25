const signup = () => {
  cy.visit('http://localhost:8080/')

  cy.get('input[value="sign-up"]').click({ force: true })
  cy.get('input[type="email"]').type('user@email.com')
  cy.get('input[type="password"]').type('12345678')

  cy.get('button').click()
  cy.wait(3000)
}

describe('Login', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:8080/')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('button').contains('Login')
  })

  it('Signs up', () => {
    signup()

    cy.getCookie('authToken').should('exist')
  })
})

describe('Create client', () => {
  it('Creates a new client', () => {
    signup()

    cy.visit('http://localhost:8080/clientes')
    cy.wait(2000)

    cy.get('.client-list-add button').click()

    cy.get('input[name="name"]').type('Fantástica Fábrica de Chocolate')
    cy.get('input[name="id"]').type('FR123456789')
    cy.get('input[name="address"]').type('P. Sherman, 42')
    cy.get('input[name="addressTwo"]').type('Wallaby Way')
    cy.get('input[name="addressThree"]').type('Sydney')

    cy.get('.client-registry-save').click()
    cy.wait(2000)

    cy.get('.pt-modal-message').contains('Cliente criado com sucesso')
    cy.get('.pt-modal-close').click()
  })

  it('Searches client', () => {
    cy.get('input[name="query"]').type('Não tem cliente com esse nome')
    cy.get('.client-registry').should('not.exist')

    cy.get('input[name="query"]').clear()
    cy.get('input[name="query"]').type('fabrica de choco')
    cy.get('.client-registry').should('exist')

    cy.get('input[name="query"]').clear()
  })

  it('Removes existing client', () => {
    cy.get('.client-registry-delete').click()
    cy.wait(2000)

    cy.get('.pt-modal-message').contains('Cliente removido com sucesso')
    cy.get('.pt-modal-close').click()
  })
})
