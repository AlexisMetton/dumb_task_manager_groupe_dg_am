describe('Page Register', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display the register form', () => {
    cy.get('form[action="/register"]').should('be.visible');
    cy.get('input[name="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[name="email"]').should('have.attr', 'placeholder', 'email');
    cy.get('input[name="password"]').should('have.attr', 'placeholder', 'Password');
    cy.get('button[type="submit"]').should('contain.text', 'Register');
  });

  it('should display an error message on failed register', () => {
    cy.get('form').fillFormAndSubmit({
      username: {text:"wronguser"},
      email: {email: "test@gmail.com"},
      password: {text:'wrongpassword'}
    })
    // cy.get('input[name="username"]').type('wronguser');
    // cy.get('input[name="password"]').type('wrongpassword');
    // cy.get('button[type="submit"]').click();

    cy.get('#message_error').should('be.visible').and('contain.text', 'Invalid username or password.');
  });

  it('should redirect to /tasks on successful login', () => {
    cy.get('form').fillFormAndSubmit({
      username: {text:"alex"},
      password: {text:'alex'}
    })
    // cy.get('input[name="username"]').type('alex');
    // cy.get('input[name="password"]').type('alex');
    // cy.get('button[type="submit"]').click();

    cy.url().should('include', '/tasks');
  });

  it('should redirect to register page when clicking Register here', () => {
    cy.get('#link_register').click();
    cy.url().should('include', '/register');
  });

});
