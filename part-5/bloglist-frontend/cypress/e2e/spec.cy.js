describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('Matti Luukkainen logged in').should('not.exist')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
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
    it("A blog can be liked", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("New Blog");
      cy.get("#author").type("Cypress tester");
      cy.get("#url").type("www.example.com");
      cy.get("#createBlogButton").click();
      cy.contains("New Blog");
      cy.contains("Cypress tester");
      cy.contains("view").click();
      cy.contains("0 likes").should("exist");
      cy.contains("0 likes").parent().contains("like").click();
      cy.contains("1 likes").should("exist");
    });

    it("Only the creator can see the delete button", function () {
      // Create a blog as the first user (creator)
      cy.contains("create new blog").click();
      cy.get("#title").type("Blog Created by mluukkai");
      cy.get("#author").type("Matti Luukkainen");
      cy.get("#url").type("https://example.com");
      cy.get("#createBlogButton").click();

      // Ensure the blog was created successfully
      cy.contains("Blog Created by mluukkai");

      // Log out the first user
      cy.contains("logout").click();

      // Create a second user
      const user2 = {
        name: "Another User",
        username: "anotheruser",
        password: "123456",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user2);
      // Log in as the second user
      cy.get("#username").type("anotheruser");
      cy.get("#password").type("123456");
      cy.get("#loginButton").click();

      // cy.contains("Blog Created by mluukkai");
      cy.contains("view").click();
      cy.get("#blog-delete").should("not.exist");

      // Log out the second user
      cy.contains("logout").click();

      // Log in again as the first user (creator)
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#loginButton").click();

      cy.contains("Blog Created by mluukkai");
      cy.contains("view").click();
      cy.get("#blog-delete").should("exist");
    });

  })
})