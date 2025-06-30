describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#loginButton').should('be.visible')
  })
})
