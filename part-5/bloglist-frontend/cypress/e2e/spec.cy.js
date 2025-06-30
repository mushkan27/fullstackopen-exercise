describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user ={
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#loginButton').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)') 
      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      // 1️⃣ Open the form to create a new blog
      cy.contains('new blog').click()

      // 2️⃣ Fill the form inputs
      cy.get('#title').type('A Cypress-created blog')
      cy.get('#author').type('Cypress Tester')
      cy.get('#url').type('http://cypresstest.com')

      // 3️⃣ Submit the form
      cy.get('#createBlogButton').click()

      // 4️⃣ Verify the new blog appears in the list
      cy.contains('A Cypress-created blog Cypress Tester')
    })

  })
})